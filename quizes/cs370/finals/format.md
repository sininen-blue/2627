options below the quiz
<div class="optionsRibbon mt20" style="overflow: visible;"><ul><li class=""><a href="javascript:submit_new_question(&quot;commit&quot;);"><i class="add" aria-hidden="true"></i>Save and return to question bank</a></li><li class=""><a href="javascript:submit_new_question(&quot;commit_and_another_same&quot;);"><i class="add" aria-hidden="true"></i>Save and add another of the same type</a></li><li class=""><a href="javascript:submit_new_question(&quot;commit_and_another&quot;);"><i class="add" aria-hidden="true"></i>Save and add another</a></li><li class="mobile_only" style="display: none"><div class="dropDownHolder"><a aria-label="toggle dropdown holder" href=""><i class="ellipsis_vertical"></i></a><div class="dropDown"><ul></ul></div></div></li></ul></div>

modal that pops up after a small delay after pressing save and add another
<div class="modal__container xl_popup" role="dialog" aria-modal="true" aria-labelledby="modal-1-add-questions-1-title" style="display: block;">
          <header class="modal__header" aria-labelledby="modal-1-add-questions-1-title">
            <h1 class="modal__title" id="modal-1-add-questions-1-title">Add questions</h1>
            <button class="modal__close" aria-label="Close modal" data-micromodal-close="">
              <i class="xCross"></i>
            </button>
          </header>
          <div class="modal__content" id="modal-1-content">


<div class="facebox-content xl_popup">
  <nav id="helpTabs" class="tabnav" role="tablist">
      <div class="width-wrap">
    <button type="button" role="tab" id="tab1" class="tabnav__tab selected" aria-selected="true" tabindex="0" rel="tab_questions" onclick="tabs_selected_pointer(this, '.facebox-content')"><span>Questions</span></button>
      <button type="button" role="tab" id="tab2" class="tabnav__tab" aria-selected="false" tabindex="-1" rel="tab_library" onclick="tabs_selected_pointer(this, '.facebox-content')"><span>Library</span></button>
      <button type="button" role="tab" id="tab3" class="tabnav__tab" aria-selected="false" tabindex="-1" rel="tab_import" onclick="tabs_selected_pointer(this, '.facebox-content')"><span>Import</span></button>
      </div>
  <div class="tabs_more_link tabnav__tab tabnav__dropdown_tab" style="display: none;" data-tabnav-dropdown="tabnav-dropdown-1791341812432">
      <div class="dropDownHolder">
        <button aria-label="Toggle dropdown menu" class="tabnav__toggle" role="tab">
          <i class="ellipsis_vertical"></i>
        </button>
        <div class="dropDown" data-dropdown-content="tabnav-dropdown-1791341812432"></div>
      </div>
    </div></nav>

  <div role="tabpanel" aria-labelledby="tab1" aria-hidden="false" id="tab_questions" class="scroll tab-content active-tab" style="display:block;">
    <dl>
        <dt><i class="trueFalse icnColor"></i> <a href="/quiz_question_bank/new_question/13943100?container_id=60049639&amp;from=%2Fteacher_quiz_assignment%2Fquestions%2F60049639%3Fadd%3Dtrue%26question_bank_id%3D13943100&amp;type=TrueOrFalse">True or false</a></dt>
        <dd>The answer to this type of question can only be true or false. 
A correct answer gets full points, and an incorrect answer gets zero points.</dd>
        <dt><i class="sessions icnColor"></i> <a href="/quiz_question_bank/new_question/13943100?container_id=60049639&amp;from=%2Fteacher_quiz_assignment%2Fquestions%2F60049639%3Fadd%3Dtrue%26question_bank_id%3D13943100&amp;type=MultipleChoiceOneAnswer">Multiple choice (one answer)</a></dt>
        <dd>The answer to this type of question is selected from a set of choices. A correct answer gets full points, and an incorrect answer gets zero points.</dd>
        <dt><i class="listNumbers icnColor"></i> <a href="/quiz_question_bank/new_question/13943100?container_id=60049639&amp;from=%2Fteacher_quiz_assignment%2Fquestions%2F60049639%3Fadd%3Dtrue%26question_bank_id%3D13943100&amp;type=MultipleChoiceManyAnswers">Multiple choice (many answers)</a></dt>
        <dd>The answer to this type of question is selected from a set of choices.
Each choice can add or subtract a specified percentage from the total
number of points associated with the question. A negative score is rounded up to zero.</dd>
        <dt><i class="fillIn icnColor"></i> <a href="/quiz_question_bank/new_question/13943100?container_id=60049639&amp;from=%2Fteacher_quiz_assignment%2Fquestions%2F60049639%3Fadd%3Dtrue%26question_bank_id%3D13943100&amp;type=FillInTheBlanks">Fill in the blanks</a></dt>
        <dd>The answer to this type of question is a set of words, one for each
blank in the question. Each blank can have one or more right answers. The score is based on the percentage of blanks that are filled in correctly. When matching is done, the case of the letters is ignored.</dd>
        <dt><i class="pencil icnColor"></i> <a href="/quiz_question_bank/new_question/13943100?container_id=60049639&amp;from=%2Fteacher_quiz_assignment%2Fquestions%2F60049639%3Fadd%3Dtrue%26question_bank_id%3D13943100&amp;type=Freeform">Freeform</a></dt>
        <dd>The answer to this type of question is text together with some optional attachments. Attachments can be any kind of file, such as a video, a PDF file, or a Word document.</dd>
        <dt><i class="matching icnColor"></i> <a href="/quiz_question_bank/new_question/13943100?container_id=60049639&amp;from=%2Fteacher_quiz_assignment%2Fquestions%2F60049639%3Fadd%3Dtrue%26question_bank_id%3D13943100&amp;type=Matching">Matching</a></dt>
        <dd>The answer to this type of question is a set of matches between two sets of items. The score is based on the percentage of matches that are correct.</dd>
        <dt><i class="hotspots icnColor"></i> <a href="/quiz_question_bank/new_question/13943100?container_id=60049639&amp;from=%2Fteacher_quiz_assignment%2Fquestions%2F60049639%3Fadd%3Dtrue%26question_bank_id%3D13943100&amp;type=Hotspot">Hotspot</a></dt>
        <dd>The answer to this type of question is one or more selected regions from a picture. The score is proportional to the number of regions correctly selected.</dd>
        <dt><i class="arithmatic icnColor"></i> <a href="/quiz_question_bank/new_question/13943100?container_id=60049639&amp;from=%2Fteacher_quiz_assignment%2Fquestions%2F60049639%3Fadd%3Dtrue%26question_bank_id%3D13943100&amp;type=Arithmetic">Arithmetic</a></dt>
        <dd>The answer to this kind of question is a number. The operators can be addition (+), subtraction (-), multiplication (*) and/or division (/). The number and range of the operands can be specified.</dd>
    </dl>
  </div>

    <div role="tabpanel" aria-labelledby="tab2" aria-hidden="false" id="tab_library" class="scroll tab-content" style="display:none;">
      <dl>
        <dt><i class="files icnColor"></i> <a role="button" onclick="return popup_clicked(this);" aria-haspopup="dialog" aria-controls="facebox" href="/add_questions_to_quiz/add/13943100?from=%2Fteacher_quiz_assignment%2Fquestions%2F60049639%3Fadd%3Dtrue%26question_bank_id%3D13943100&amp;lesson_id=60049639">Library</a></dt>
        <dd>Add copies of questions from question banks or quizzes in a library or your favorites.</dd>
      </dl>
    </div>

    <div role="tabpanel" aria-labelledby="tab3" aria-hidden="false" id="tab_import" class="scroll tab-content" style="display:none;">
      <dl>
        <div class="dl-item">
          <dt><a onclick="return popup_trigger_new_page('/uploader/index/13943100?data_json=%7B%22resource%22%3A%22QtiImport%22%2C%22location%22%3Anull%2C%22container_id%22%3A%2260049639%22%2C%22only_file%22%3Atrue%2C%22question_bank_id%22%3A13943100%2C%22controller%22%3A%22quiz_question_bank%22%7D')" href="#"><i class="folderUp icnColor"></i> Import QTI</a></dt>
          <dd>Add questions from a QTI file</dd>
        </div>
      </dl>
    </div>
</div>
</div>
        </div>


multiple correct answers choices snippet
<p>
&nbsp;&nbsp;1.
<input type="text" name="text[1]" id="text_1" size="50" class="textInput">&nbsp;
<input type="checkbox" name="correct[1]" id="correct_1" value="true" size="3"><label for="correct_1">Correct?</label>
Override:&nbsp;&nbsp;<input type="text" name="percent[1]" id="percent_1" size="3" class="textInput"> %
</p>


blank questions snippet
./blank_question.html

freeform questions snippet
./freeform_question.html



# desired question format

What determines the output of a combinational circuit at any instant?

- The current input values
- The past state of the circuit
- The sequence of previous inputs
- The number of memory elements

---
type: many

How does a combinational circuit respond to a given set of inputs?

* It always produces the same outputs # i want stars to denote correct
* It depends on its internal history 
- It stores the input for later use
- It alternates between two results

---
type: blank

a BLANK circuit responds only the a set of inputs

- combinational # one choice per blank

---
type: freeform
points: 5

Describe the microinstructions level with one sentence

---

type: tf

Combinational circuits respond to a set of inputs and previous states

- false

---
