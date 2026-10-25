/* ============================================================
   Starlight Primary School — student portal logic
   Pages: dashboard, lessons, lesson, quizzes, quiz
   ============================================================ */
(function () {
  'use strict';

  var D = window.SLSData, S = window.SLS;

  function progressBadge(state) {
    if (state === 'completed') return '<span class="badge badge-done">Completed</span>';
    if (state === 'in-progress') return '<span class="badge badge-progress">In progress</span>';
    return '<span class="badge badge-todo">Not started</span>';
  }

  /* ---------------- Dashboard ---------------- */
  function pageDashboard() {
    var lessons = D.getLessons();
    var progress = D.getProgress();
    var assignments = D.getAssignments();

    // Welcome banner
    var completed = lessons.filter(function (l) { return progress[l.id] === 'completed'; }).length;
    var dueSoon = assignments.filter(function (a) {
      return new Date(a.due + 'T23:59:59') >= new Date();
    }).length;
    var welcome = document.querySelector('[data-welcome]');
    if (welcome) {
      welcome.innerHTML =
        '<h2>' + S.greeting() + ', Tapiwa.</h2>' +
        '<p>You have finished ' + completed + ' of ' + lessons.length + ' lessons and there ' +
        (dueSoon === 1 ? 'is 1 assignment' : 'are ' + dueSoon + ' assignments') +
        ' waiting. A good day to keep going.</p>';
    }

    // Stats
    var quizTotal = 0, quizSum = 0;
    D.getQuizzes().forEach(function (q) {
      var best = D.bestAttempt(q.id);
      if (best) { quizTotal += 1; quizSum += (best.score / best.total) * 100; }
    });
    var avg = quizTotal ? Math.round(quizSum / quizTotal) : 0;

    var stats = document.querySelector('[data-stats]');
    if (stats) {
      stats.innerHTML =
        statCard('amber', 'book', completed + '/' + lessons.length, 'Lessons completed', 'Keep the streak going') +
        statCard('green', 'award', avg + '%', 'Quiz average', quizTotal ? 'Across ' + quizTotal + ' quizzes attempted' : 'No quizzes attempted yet') +
        statCard('blue', 'inbox', String(dueSoon), 'Assignments due', 'Check the list below') +
        statCard('red', 'clipboard', countNotStarted(progress, lessons), 'Lessons to start', 'New topics are waiting');
    }

    // Continue learning
    var slot = document.getElementById('continue-slot');
    if (slot) {
      var current = lessons.find(function (l) { return progress[l.id] === 'in-progress'; }) ||
                    lessons.find(function (l) { return !progress[l.id]; });
      if (current) {
        slot.innerHTML =
          '<a class="continue" href="lesson.html?id=' + current.id + '">' +
            '<span class="continue-thumb">' + S.icon(S.subjectIcon(current.subject)) + '</span>' +
            '<span class="continue-body">' +
              '<b>' + S.esc(current.title) + '</b>' +
              '<span>' + S.esc(current.subject) + ' \u00B7 ' + current.duration + ' min \u00B7 ' + S.esc(current.klass) + '</span>' +
              '<span class="progress progress--navy" aria-hidden="true"><i style="width:' +
                (progress[current.id] === 'in-progress' ? 45 : 0) + '%"></i></span>' +
            '</span>' +
            '<span class="btn btn-primary btn-sm">Resume ' + S.icon('arrow-right') + '</span>' +
          '</a>';
      }
    }

    // Assignments due
    var list = document.getElementById('assignments-slot');
    if (list) {
      list.innerHTML = assignments.map(function (a) {
        return '<div class="row-item">' +
          '<span class="row-icon row-icon--amber">' + S.icon('calendar') + '</span>' +
          '<span class="row-body"><b>' + S.esc(a.title) + '</b>' +
            '<span>' + S.esc(a.subject) + ' \u00B7 ' + S.esc(a.klass) + '</span></span>' +
          '<span class="row-side"><time datetime="' + a.due + '">Due ' + S.fmtDue(a.due) + '</time>' +
            S.dueBadge(a.due) + '</span>' +
        '</div>';
      }).join('');
    }

    // Recent lessons
    var recent = document.getElementById('recent-slot');
    if (recent) {
      recent.innerHTML = lessons.slice(0, 4).map(function (l) {
        var state = progress[l.id] || 'not-started';
        return '<a class="row-item" href="lesson.html?id=' + l.id + '">' +
          '<span class="row-icon">' + S.icon(S.subjectIcon(l.subject)) + '</span>' +
          '<span class="row-body"><b>' + S.esc(l.title) + '</b>' +
            '<span>' + S.esc(l.subject) + ' \u00B7 ' + l.duration + ' min</span></span>' +
          '<span class="row-side">' + progressBadge(state) + '</span>' +
        '</a>';
      }).join('');
    }
  }

  function statCard(tone, ic, num, label, note) {
    return '<article class="stat-card">' +
      '<span class="stat-icon stat-icon--' + tone + '">' + S.icon(ic) + '</span>' +
      '<div><p class="stat-num">' + num + '</p>' +
      '<p class="stat-label">' + label + '</p>' +
      '<p class="stat-note">' + note + '</p></div>' +
    '</article>';
  }

  function countNotStarted(progress, lessons) {
    return lessons.filter(function (l) { return !progress[l.id]; }).length;
  }

  /* ---------------- Lessons list ---------------- */
  function pageLessons() {
    var lessons = D.getLessons();
    var progress = D.getProgress();
    var grid = document.getElementById('lesson-grid');
    var tabs = document.getElementById('filter-tabs');
    var active = 'All';

    var subjects = [];
    lessons.forEach(function (l) {
      if (subjects.indexOf(l.subject) === -1) subjects.push(l.subject);
    });

    function render() {
      var shown = lessons.filter(function (l) {
        return active === 'All' || l.subject === active;
      });
      grid.innerHTML = shown.map(function (l) {
        var state = progress[l.id] || 'not-started';
        var cta = state === 'completed' ? 'Review' : (state === 'in-progress' ? 'Continue' : 'Read');
        return '<article class="lesson-card">' +
          '<div class="card-top">' +
            '<span class="chip chip-' + S.subjectSlug(l.subject) + '">' +
              S.icon(S.subjectIcon(l.subject)) + S.esc(l.subject) + '</span>' +
            progressBadge(state) +
          '</div>' +
          '<h3>' + S.esc(l.title) + '</h3>' +
          '<p class="card-desc">' + S.esc(l.summary) + '</p>' +
          '<p class="card-meta">' +
            '<span>' + S.icon('clock') + l.duration + ' min</span>' +
            '<span>' + S.icon('users') + S.esc(l.klass) + '</span>' +
          '</p>' +
          '<div class="card-foot">' +
            '<span class="row-body" style="flex:0"><b style="font-size:.78rem">' + S.esc(l.author) + '</b></span>' +
            '<a class="btn btn-primary btn-sm" href="lesson.html?id=' + l.id + '">' + cta + ' ' + S.icon('arrow-right') + '</a>' +
          '</div>' +
        '</article>';
      }).join('') || emptyState('No lessons here yet', 'Your teacher has not published a lesson for this subject. Try another filter.');
    }

    if (tabs) {
      tabs.innerHTML = ['All'].concat(subjects).map(function (s) {
        return '<button type="button" class="tab' + (s === active ? ' is-active' : '') +
          '" data-subject="' + S.esc(s) + '">' + S.esc(s) + '</button>';
      }).join('');
      tabs.addEventListener('click', function (e) {
        var btn = e.target.closest('.tab');
        if (!btn) return;
        active = btn.dataset.subject;
        tabs.querySelectorAll('.tab').forEach(function (t) {
          t.classList.toggle('is-active', t === btn);
        });
        render();
      });
    }
    render();
  }

  function emptyState(title, text) {
    return '<div class="empty">' +
      '<img src="../assets/images/ill-empty.svg" alt="" width="180" height="131">' +
      '<h3>' + S.esc(title) + '</h3><p>' + S.esc(text) + '</p></div>';
  }

  /* ---------------- Lesson reader ---------------- */
  function pageLesson() {
    var id = S.param('id');
    var lesson = D.getLessons().find(function (l) { return l.id === id; });
    var slot = document.getElementById('lesson-slot');

    if (!lesson) {
      window.location.replace('lessons.html');
      return;
    }

    var progress = D.getProgress();
    var state = progress[lesson.id] || 'not-started';

    slot.innerHTML =
      '<nav class="crumb" aria-label="Back">' +
        '<a class="crumb" href="lessons.html">' + S.icon('arrow-left') + ' All lessons</a>' +
      '</nav>' +
      '<header class="lesson-head">' +
        '<div><span class="chip chip-' + S.subjectSlug(lesson.subject) + '">' +
          S.icon(S.subjectIcon(lesson.subject)) + S.esc(lesson.subject) + '</span></div>' +
        '<h1>' + S.esc(lesson.title) + '</h1>' +
        '<p class="lesson-meta">' +
          '<span>' + S.icon('clock') + lesson.duration + ' minutes</span>' +
          '<span>' + S.icon('users') + S.esc(lesson.klass) + '</span>' +
          '<span>' + S.icon('edit') + 'By ' + S.esc(lesson.author) + '</span>' +
        '</p>' +
      '</header>' +
      '<article class="prose">' + S.renderBlocks(lesson.content) + '</article>' +
      '<div class="lesson-actions">' +
        '<p>' + (state === 'completed' ? 'You have completed this lesson.' : 'Finished reading? Mark it as complete.') + '</p>' +
        '<div class="group">' +
          '<button type="button" class="btn ' + (state === 'completed' ? 'btn-ghost' : 'btn-ghost') +
            '" id="complete-btn"' + (state === 'completed' ? ' disabled' : '') + '>' +
            S.icon('check') + (state === 'completed' ? 'Completed' : 'Mark as complete') + '</button>' +
          (lesson.quizId
            ? '<a class="btn btn-accent" href="quiz.html?id=' + lesson.quizId + '">' + S.icon('clipboard') + ' Take the quiz</a>'
            : '') +
        '</div>' +
      '</div>';

    var btn = document.getElementById('complete-btn');
    if (btn && state !== 'completed') {
      btn.addEventListener('click', function () {
        D.setProgress(lesson.id, 'completed');
        btn.disabled = true;
        btn.innerHTML = S.icon('check') + ' Completed';
        S.toast('Lesson marked as complete. Well done.');
      });
    }
  }

  /* ---------------- Quizzes list ---------------- */
  function pageQuizzes() {
    var quizzes = D.getQuizzes();
    var lessons = D.getLessons();
    var grid = document.getElementById('quiz-grid');

    grid.innerHTML = quizzes.map(function (q) {
      var lesson = lessons.find(function (l) { return l.id === q.lessonId; }) || {};
      var best = D.bestAttempt(q.id);
      var badge = best
        ? '<span class="badge badge-done">Best ' + best.score + '/' + best.total + '</span>'
        : '<span class="badge badge-todo">Not attempted</span>';
      return '<article class="lesson-card">' +
        '<div class="card-top">' +
          '<span class="chip chip-' + S.subjectSlug(lesson.subject || 'English') + '">' +
            S.icon(S.subjectIcon(lesson.subject || 'English')) + S.esc(lesson.subject || 'General') + '</span>' +
          badge +
        '</div>' +
        '<h3>' + S.esc(q.title) + '</h3>' +
        '<p class="card-desc">Multiple-choice quiz on \u201C' + S.esc(lesson.title || 'this lesson') +
          '\u201D. Your answers are marked the moment you submit.</p>' +
        '<p class="card-meta"><span>' + S.icon('clipboard') + q.questions.length + ' questions</span>' +
          '<span>' + S.icon('clock') + 'About ' + (q.questions.length * 2) + ' min</span></p>' +
        '<div class="card-foot">' +
          '<span style="font-size:.78rem;color:var(--muted)">' + (best ? 'Keep improving your score' : 'Give it your first try') + '</span>' +
          '<a class="btn btn-primary btn-sm" href="quiz.html?id=' + q.id + '">' +
            (best ? 'Retake' : 'Start') + ' ' + S.icon('arrow-right') + '</a>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  /* ---------------- Quiz attempt ---------------- */
  function pageQuiz() {
    var id = S.param('id');
    var quiz = D.getQuizzes().find(function (q) { return q.id === id; });
    var slot = document.getElementById('quiz-slot');

    if (!quiz) {
      window.location.replace('quizzes.html');
      return;
    }
    var lesson = D.getLessons().find(function (l) { return l.id === quiz.lessonId; }) || {};
    var best = D.bestAttempt(quiz.id);

    renderIntro();

    function renderIntro() {
      slot.innerHTML =
        '<nav class="crumb"><a class="crumb" href="quizzes.html">' + S.icon('arrow-left') + ' All quizzes</a></nav>' +
        '<section class="panel" style="max-width:640px">' +
          '<p><span class="chip chip-' + S.subjectSlug(lesson.subject || 'English') + '">' +
            S.icon(S.subjectIcon(lesson.subject || 'English')) + S.esc(lesson.subject || 'General') + '</span></p>' +
          '<h2 style="font:600 1.5rem var(--font-display);color:var(--ink);margin:14px 0 6px">' + S.esc(quiz.title) + '</h2>' +
          '<p style="color:var(--body);font-size:.95rem;max-width:56ch">' +
            'Read each question carefully and choose one answer. You can change your choices before you submit. ' +
            (best ? 'Your best score so far is ' + best.score + ' out of ' + best.total + '.' : 'This quiz has not been attempted yet.') +
          '</p>' +
          '<div class="quiz-facts">' +
            '<div class="fact"><b>' + quiz.questions.length + '</b><span>Questions</span></div>' +
            '<div class="fact"><b>' + (quiz.questions.length * 2) + ' min</b><span>Suggested time</span></div>' +
            '<div class="fact"><b>' + (best ? Math.round(best.score / best.total * 100) + '%' : '\u2014') + '</b><span>Best score</span></div>' +
          '</div>' +
          '<div style="display:flex;gap:12px;flex-wrap:wrap">' +
            '<button type="button" class="btn btn-accent" id="start-quiz">' + S.icon('clipboard') + ' Start quiz</button>' +
            (lesson.id ? '<a class="btn btn-ghost" href="lesson.html?id=' + lesson.id + '">' + S.icon('book') + ' Revisit the lesson</a>' : '') +
          '</div>' +
        '</section>';
      document.getElementById('start-quiz').addEventListener('click', renderForm);
    }

    function renderForm() {
      window.scrollTo(0, 0);
      slot.innerHTML =
        '<nav class="crumb"><a class="crumb" href="quizzes.html">' + S.icon('arrow-left') + ' All quizzes</a></nav>' +
        '<form id="quiz-form" novalidate>' +
          '<h2 style="font:600 1.4rem var(--font-display);color:var(--ink)">' + S.esc(quiz.title) + '</h2>' +
          '<div class="quiz-list" style="margin-top:16px">' +
            quiz.questions.map(function (q, i) {
              return '<fieldset class="q-card" style="border:none;padding:0;margin:0">' +
                '<p class="q-num">Question ' + (i + 1) + ' of ' + quiz.questions.length + '</p>' +
                '<p class="q-text" id="q-label-' + i + '">' + S.esc(q.q) + '</p>' +
                '<div class="options" role="radiogroup" aria-labelledby="q-label-' + i + '">' +
                  q.options.map(function (opt, oi) {
                    return '<label class="option"><input type="radio" name="q' + i + '" value="' + oi + '">' +
                      '<span class="key">' + 'ABCD'[oi] + '</span><span>' + S.esc(opt) + '</span></label>';
                  }).join('') +
                '</div>' +
              '</fieldset>';
            }).join('') +
          '</div>' +
          '<div class="quiz-actions" style="margin-top:20px">' +
            '<button type="button" class="btn btn-ghost" id="cancel-quiz">Cancel</button>' +
            '<button type="submit" class="btn btn-accent">' + S.icon('check') + ' Submit answers</button>' +
          '</div>' +
        '</form>';

      // highlight picked option
      slot.addEventListener('change', function (e) {
        if (!e.target.matches('input[type="radio"]')) return;
        var group = e.target.closest('.options');
        group.querySelectorAll('.option').forEach(function (o) { o.classList.remove('is-picked'); });
        e.target.closest('.option').classList.add('is-picked');
      });

      document.getElementById('cancel-quiz').addEventListener('click', renderIntro);

      document.getElementById('quiz-form').addEventListener('submit', function (e) {
        e.preventDefault();
        var unanswered = 0;
        quiz.questions.forEach(function (_, i) {
          if (!slot.querySelector('input[name="q' + i + '"]:checked')) unanswered += 1;
        });
        if (unanswered > 0) {
          S.confirmDialog({
            title: 'Submit with unanswered questions?',
            message: 'You have ' + unanswered + ' question' + (unanswered > 1 ? 's' : '') +
              ' without an answer. Unanswered questions will be marked wrong.',
            confirmText: 'Submit anyway'
          }).then(function (yes) { if (yes) grade(); });
        } else {
          grade();
        }
      });
    }

    function grade() {
      var score = 0;
      var review = quiz.questions.map(function (q, i) {
        var picked = slot.querySelector('input[name="q' + i + '"]:checked');
        var pick = picked ? Number(picked.value) : -1;
        var ok = pick === q.answer;
        if (ok) score += 1;
        return { q: q, pick: pick, ok: ok, index: i };
      });

      D.recordAttempt(quiz.id, { at: new Date().toISOString(), score: score, total: quiz.questions.length });
      renderResult(score, review);
      window.scrollTo(0, 0);
    }

    function renderResult(score, review) {
      var pct = Math.round(score / quiz.questions.length * 100);
      var tone = pct >= 80 ? 'is-good' : (pct >= 50 ? 'is-mid' : 'is-low');
      var message = pct >= 80 ? 'Excellent work. You really know this topic.'
        : pct >= 50 ? 'Good effort. A quick re-read of the lesson will lift your score.'
        : 'Keep trying. Revisit the lesson and come back to this quiz.';

      slot.innerHTML =
        '<nav class="crumb"><a class="crumb" href="quizzes.html">' + S.icon('arrow-left') + ' All quizzes</a></nav>' +
        '<section class="score-band ' + tone + '">' +
          '<b>' + score + ' / ' + quiz.questions.length + '</b>' +
          '<span>' + pct + '% \u2014 ' + message + '</span>' +
        '</section>' +
        '<div class="quiz-list" style="margin-top:20px">' +
          review.map(function (r) {
            var optionsHtml = r.q.options.map(function (opt, oi) {
              var cls = 'option is-locked';
              if (oi === r.q.answer) cls += ' is-correct';
              else if (oi === r.pick) cls += ' is-wrong';
              var tag = oi === r.q.answer ? '<span class="tag">Correct answer</span>'
                : (oi === r.pick ? '<span class="tag">Your pick</span>' : '');
              return '<label class="' + cls + '"><span class="key">' + 'ABCD'[oi] + '</span><span>' +
                S.esc(opt) + '</span>' + tag + '</label>';
            }).join('');
            return '<article class="review-item">' +
              '<p class="verdict ' + (r.ok ? 'ok' : 'no') + '">' + (r.ok ? 'Correct' : 'Incorrect') +
                ' \u00B7 Question ' + (r.index + 1) + '</p>' +
              '<p class="q-text">' + S.esc(r.q.q) + '</p>' +
              '<div class="options">' + optionsHtml + '</div>' +
            '</article>';
          }).join('') +
        '</div>' +
        '<div class="quiz-actions" style="margin-top:20px">' +
          '<a class="btn btn-ghost" href="quizzes.html">Back to quizzes</a>' +
          '<button type="button" class="btn btn-primary" id="retry-quiz">' + S.icon('clipboard') + ' Try again</button>' +
        '</div>';

      document.getElementById('retry-quiz').addEventListener('click', renderForm);
      window.scrollTo(0, 0);
    }
  }

  /* ---------------- Router ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    S.initShell();
    D.ensureSeed();

    var page = document.body.dataset.page;
    if (page === 'student-dashboard') pageDashboard();
    else if (page === 'student-lessons') pageLessons();
    else if (page === 'student-lesson') pageLesson();
    else if (page === 'student-quizzes') pageQuizzes();
    else if (page === 'student-quiz') pageQuiz();
  });
})();
