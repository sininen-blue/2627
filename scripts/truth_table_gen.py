#!/usr/bin/env python3
"""
Truth table generator for boolean expressions.

Operators (in order of precedence, highest to lowest):
    !   NOT   (unary, right-associative)
    *   AND
    x   XOR
    +   OR

Parentheses ( ) are supported for grouping.

Variables must be single uppercase letters (optionally followed by digits),
e.g. A, B, X1, VAR2 ... anything that isn't exactly the operator tokens.
Lowercase 'x' is reserved for XOR, so variables are written uppercase to
avoid ambiguity.

Usage:
    python3 truth_table_gen.py "A * B + !C"     # one-shot mode
    python3 truth_table_gen.py                     # interactive loop mode
    python3 truth_table_gen.py -o T/F               # loop mode, T/F output

If an expression is given on the command line, it is evaluated once and the
program exits. If no expression is given, the program enters an interactive
loop where you can keep entering expressions (type 'quit'/'exit' or press
Ctrl-D/Ctrl-C to stop).
"""

import argparse
import itertools
import re
import sys


# --------------------------------------------------------------------------
# Tokenizer
# --------------------------------------------------------------------------

TOKEN_RE = re.compile(r"""
    \s*(?:
        (?P<LPAREN>\()   |
        (?P<RPAREN>\))   |
        (?P<NOT>!)       |
        (?P<AND>\*)      |
        (?P<XOR>x)       |
        (?P<OR>\+)       |
        (?P<VAR>[A-Z][A-Z0-9_]*)
    )
""", re.VERBOSE)


class Token:
    __slots__ = ("kind", "value")

    def __init__(self, kind, value):
        self.kind = kind
        self.value = value

    def __repr__(self):
        return f"Token({self.kind!r}, {self.value!r})"


def tokenize(expr):
    tokens = []
    pos = 0
    length = len(expr)
    while pos < length:
        if expr[pos].isspace():
            pos += 1
            continue
        m = TOKEN_RE.match(expr, pos)
        if not m or m.end() == pos:
            raise ValueError(
                f"Invalid character {expr[pos]!r} at position {pos} in expression"
            )
        kind = m.lastgroup
        value = m.group(kind)
        tokens.append(Token(kind, value))
        pos = m.end()
    return tokens


# --------------------------------------------------------------------------
# AST nodes
# --------------------------------------------------------------------------

class Var:
    def __init__(self, name):
        self.name = name

    def eval(self, env):
        return env[self.name]

    def __repr__(self):
        return self.name


class Not:
    def __init__(self, node):
        self.node = node

    def eval(self, env):
        return not self.node.eval(env)

    def __repr__(self):
        return f"!{self.node!r}"


class BinOp:
    def __init__(self, op, left, right):
        self.op = op
        self.left = left
        self.right = right

    def eval(self, env):
        l = self.left.eval(env)
        r = self.right.eval(env)
        if self.op == "AND":
            return l and r
        if self.op == "OR":
            return l or r
        if self.op == "XOR":
            return bool(l) != bool(r)
        raise ValueError(f"Unknown operator {self.op}")

    def __repr__(self):
        symbol = {"AND": "*", "OR": "+", "XOR": "x"}[self.op]
        return f"({self.left!r} {symbol} {self.right!r})"


# --------------------------------------------------------------------------
# Recursive-descent parser
#
# expr      := xor_expr ( '+' xor_expr )*
# xor_expr  := and_expr ( 'x' and_expr )*
# and_expr  := unary ( '*' unary )*
# unary     := '!' unary | '(' expr ')' | VAR
# --------------------------------------------------------------------------

class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0

    def peek(self):
        return self.tokens[self.pos] if self.pos < len(self.tokens) else None

    def advance(self):
        tok = self.peek()
        self.pos += 1
        return tok

    def expect(self, kind):
        tok = self.peek()
        if tok is None or tok.kind != kind:
            raise ValueError(f"Expected {kind} but got {tok!r}")
        return self.advance()

    def parse(self):
        node = self.parse_expr()
        if self.peek() is not None:
            raise ValueError(f"Unexpected token {self.peek()!r} at end of expression")
        return node

    def parse_expr(self):
        node = self.parse_xor()
        while self.peek() is not None and self.peek().kind == "OR":
            self.advance()
            right = self.parse_xor()
            node = BinOp("OR", node, right)
        return node

    def parse_xor(self):
        node = self.parse_and()
        while self.peek() is not None and self.peek().kind == "XOR":
            self.advance()
            right = self.parse_and()
            node = BinOp("XOR", node, right)
        return node

    def parse_and(self):
        node = self.parse_unary()
        while self.peek() is not None and self.peek().kind == "AND":
            self.advance()
            right = self.parse_unary()
            node = BinOp("AND", node, right)
        return node

    def parse_unary(self):
        tok = self.peek()
        if tok is None:
            raise ValueError("Unexpected end of expression")
        if tok.kind == "NOT":
            self.advance()
            return Not(self.parse_unary())
        if tok.kind == "LPAREN":
            self.advance()
            node = self.parse_expr()
            self.expect("RPAREN")
            return node
        if tok.kind == "VAR":
            self.advance()
            return Var(tok.value)
        raise ValueError(f"Unexpected token {tok!r}")


def parse_expression(expr):
    tokens = tokenize(expr)
    if not tokens:
        raise ValueError("Empty expression")
    return Parser(tokens).parse()


def collect_variables(node, found=None):
    if found is None:
        found = []
    if isinstance(node, Var):
        if node.name not in found:
            found.append(node.name)
    elif isinstance(node, Not):
        collect_variables(node.node, found)
    elif isinstance(node, BinOp):
        collect_variables(node.left, found)
        collect_variables(node.right, found)
    return found


# --------------------------------------------------------------------------
# Truth table generation
# --------------------------------------------------------------------------

def generate_truth_table(expr, true_repr="1", false_repr="0"):
    ast = parse_expression(expr)
    variables = sorted(collect_variables(ast))
    if not variables:
        raise ValueError("Expression contains no variables")

    rows = []
    for combo in itertools.product([False, True], repeat=len(variables)):
        env = dict(zip(variables, combo))
        result = ast.eval(env)
        rows.append((combo, result))

    return variables, rows, ast


def format_bool(b, true_repr, false_repr):
    return true_repr if b else false_repr


def print_truth_table(expr, true_repr="1", false_repr="0"):
    variables, rows, ast = generate_truth_table(expr, true_repr, false_repr)

    headers = variables + [expr]
    col_widths = [max(len(h), 5) for h in headers[:-1]] + [max(len(expr), 6)]

    def fmt_row(values):
        return " | ".join(v.center(w) for v, w in zip(values, col_widths))

    print(fmt_row(headers))
    print("-+-".join("-" * w for w in col_widths))

    for combo, result in rows:
        values = [format_bool(v, true_repr, false_repr) for v in combo]
        values.append(format_bool(result, true_repr, false_repr))
        print(fmt_row(values))


# --------------------------------------------------------------------------
# CLI
# --------------------------------------------------------------------------

def run_loop(true_repr, false_repr):
    print("Truth Table Generator (looped mode)")
    print("Operators: ! not, * and, x xor, + or, ( ) grouping")
    print("Variables must be uppercase letters, e.g. A, B, X1")
    print("Type 'quit', 'exit', or press Ctrl-D/Ctrl-C to stop.\n")

    while True:
        try:
            expr = input("Expression> ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nBye.")
            break

        if not expr:
            continue
        if expr.lower() in ("quit", "exit", "q"):
            print("Bye.")
            break

        try:
            print_truth_table(expr, true_repr, false_repr)
        except ValueError as e:
            print(f"Error: {e}", file=sys.stderr)

        print()


def main():
    parser = argparse.ArgumentParser(
        description="Generate a truth table for a boolean expression "
                     "(operators: ! not, * and, x xor, + or, parentheses supported). "
                     "Runs in an interactive loop so you can enter multiple "
                     "expressions in one session.",
    )
    parser.add_argument(
        "expression",
        nargs="?",
        help="Boolean expression to evaluate once, e.g. \"A * B + !C\" "
             "(quote it in your shell). If omitted, enters interactive loop mode.",
    )
    parser.add_argument(
        "-o", "--output-format",
        default="1/0",
        help="Format for true/false values as 'TRUE/FALSE', default '1/0'. "
             "Example: -o T/F",
    )
    args = parser.parse_args()

    if "/" not in args.output_format:
        print("Invalid --output-format, expected TRUE/FALSE e.g. '1/0' or 'T/F'",
              file=sys.stderr)
        sys.exit(1)
    true_repr, false_repr = args.output_format.split("/", 1)

    if args.expression:
        # One-shot mode: evaluate the given expression and exit.
        try:
            print_truth_table(args.expression, true_repr, false_repr)
        except ValueError as e:
            print(f"Error: {e}", file=sys.stderr)
            sys.exit(1)
    else:
        # No expression given: drop into interactive loop mode.
        run_loop(true_repr, false_repr)


if __name__ == "__main__":
    main()
