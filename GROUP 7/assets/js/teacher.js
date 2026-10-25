/* ============================================================
   Starlight Primary School — teacher portal logic
   Pages: dashboard, create-lesson, submissions
   ============================================================ */
(function () {
  'use strict';

  var D = window.SLSData, S = window.SLS;

  var STATUS_BADGE = {
    submitted: '<span class="badge badge-progress">Submitted</span>',
    late: '<span class="badge badge-late">Late</span>',
    graded: '<span class="badge badge-graded">Graded</span>'
  };

  /* ---------------- Dashboard ---------------- */
  function pageDashboard() {
    var lessons = D.getLessons();
    var submissions = D.getSubmissions();
    var assignments = D.getAssignments();

    var toReview = submissions.filter(function (s) { return s.status !== 'graded'; }).length;
    var graded = submissions.filter(function (s) { return s.status === 'graded'; });
    var avg = graded.length
      ? Math.round(graded.reduce(function (sum, s) { return sum + s.score; }, 0) / graded.length)
      : 0;

    var welcome = document.querySelector('[data-welcome]');
    if (welcome) {
      welcome.innerHTML =
        '<h2>' + S.greeting() + ', Mr Phiri.</h2>' +
        '<p>You have ' + toReview + ' submission' + (toReview === 1 ? '' : 's') +
        ' waiting for review and ' + lessons.length + ' lesson' + (lessons.length === 1 ? '' : 's') +
        ' in the library. Here is how your class is doing.</p>';
    }

    var stats = document.querySelector('[data-stats]');
    if (stats) {
      stats.innerHTML =
        statCard('blue', 'book', String(lessons.length), 'Lessons published', 'Across all subjects') +
        statCard('amber', 'inbox', String(toReview), 'To review', 'Submitted or late work') +
        statCard('green', 'award', avg + '%', 'Average graded score', 'From ' + graded.length + ' graded pieces') +
        statCard('red', 'users', String(D.getStudents().length), 'Students in Standard 4', 'Your register class');
    }

    var recent = document.getElementById('recent-subs');
    if (recent) {
      var sorted = submissions.slice().sort(function (a, b) {
        return new Date(b.submittedAt) - new Date(a.submittedAt);
      }).slice(0, 5);
      recent.innerHTML = sorted.map(function (s) {
        var a = assignments.find(function (x) { return x.id === s.assignmentId; }) || {};
        return '<a class="row-item" href="submissions.html">' +
          '<span class="avatar avatar-sm ' + S.avatarClass(s.student) + '" aria-hidden="true">' + S.initials(s.student) + '</span>' +
          '<span class="row-body"><b>' + S.esc(s.student) + '</b>' +
            '<span>' + S.esc(a.title || 'Assignment') + '</span></span>' +
          '<span class="row-side"><time datetime="' + s.submittedAt + '">' + S.fmtStamp(s.submittedAt) + '</time>' +
            STATUS_BADGE[s.status] + '</span>' +
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

  /* ---------------- Create lesson ---------------- */
  function pageCreateLesson() {
    var form = document.getElementById('lesson-form');
    var attach = document.getElementById('attach-quiz');
    var builder = document.getElementById('quiz-builder');
    var addQ = document.getElementById('add-question');
    var rows = document.getElementById('builder-rows');

    attach.addEventListener('change', function () {
      builder.hidden = !attach.checked;
    });

    function questionRow(index) {
      return '<div class="builder-row" data-row="' + index + '">' +
        '<button type="button" class="icon-btn icon-btn--danger builder-remove" aria-label="Remove question">' +
          S.icon('trash') + '</button>' +
        '<div class="field field--full">' +
          '<label>Question ' + (index + 1) + '</label>' +
          '<input type="text" class="input q-title" placeholder="e.g. What is 1/2 of 10?">' +
        '</div>' +
        '<div class="builder-opts">' +
          [0, 1, 2, 3].map(function (oi) {
            return '<div class="opt-cell">' +
              '<input type="radio" name="correct-' + index + '" value="' + oi + '" aria-label="Mark option ' + 'ABCD'[oi] + ' as correct">' +
              '<input type="text" class="input q-opt" placeholder="Option ' + 'ABCD'[oi] + '">' +
            '</div>';
          }).join('') +
        '</div>' +
        '<p class="hint">Tick the radio button next to the correct option. Options A and B are required.</p>' +
      '</div>';
    }

    function renumber() {
      rows.querySelectorAll('.builder-row').forEach(function (row, i) {
        row.dataset.row = i;
        var label = row.querySelector('label');
        if (label) label.textContent = 'Question ' + (i + 1);
        row.querySelectorAll('input[type="radio"]').forEach(function (r) {
          r.name = 'correct-' + i;
        });
      });
    }

    rows.innerHTML = questionRow(0);
    addQ.addEventListener('click', function () {
      rows.insertAdjacentHTML('beforeend', questionRow(rows.querySelectorAll('.builder-row').length));
      renumber();
    });
    rows.addEventListener('click', function (e) {
      var btn = e.target.closest('.builder-remove');
      if (!btn) return;
      if (rows.querySelectorAll('.builder-row').length === 1) {
        S.toast('A quiz needs at least one question.', 'error');
        return;
      }
      btn.closest('.builder-row').remove();
      renumber();
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var title = document.getElementById('l-title').value.trim();
      var subject = document.getElementById('l-subject').value;
      var klass = document.getElementById('l-class').value;
      var duration = Number(document.getElementById('l-duration').value) || 20;
      var summary = document.getElementById('l-summary').value.trim();
      var contentText = document.getElementById('l-content').value.trim();

      if (!title || !summary || !contentText) {
        S.toast('Please fill in the title, summary and lesson notes.', 'error');
        return;
      }

      // Build optional quiz
      var quizId = null;
      if (attach.checked) {
        var questions = [];
        var invalid = false;
        rows.querySelectorAll('.builder-row').forEach(function (row) {
          if (invalid) return;
          var q = row.querySelector('.q-title').value.trim();
          var opts = Array.prototype.map.call(row.querySelectorAll('.q-opt'), function (i) {
            return i.value.trim();
          });
          var correct = row.querySelector('input[type="radio"]:checked');
          if (!q || !opts[0] || !opts[1]) {
            invalid = true;
            return;
          }
          var filled = [opts[0], opts[1]];
          if (opts[2]) filled.push(opts[2]);
          if (opts[3]) filled.push(opts[3]);
          var answer = correct ? Number(correct.value) : 0;
          if (answer >= filled.length) answer = 0;
          questions.push({ q: q, options: filled, answer: answer });
        });
        if (invalid) {
          S.toast('Each quiz question needs a title and at least options A and B.', 'error');
          return;
        }
        if (questions.length) {
          quizId = 'q-' + Date.now();
          var quizList = D.getQuizzes();
          quizList.push({
            id: quizId,
            lessonId: 'cl-' + Date.now(),
            title: title + ' — Quiz',
            questions: questions
          });
          D.saveQuizzes(quizList);
        }
      }

      var lessonId = quizId ? 'cl-' + Date.now() : 'cl-' + Date.now();
      // keep quiz.lessonId in sync when a quiz was created above
      if (quizId) {
        var qs = D.getQuizzes();
        var made = qs.find(function (q) { return q.id === quizId; });
        if (made) made.lessonId = lessonId;
        D.saveQuizzes(qs);
      }

      var list = D.getLessons();
      list.push({
        id: lessonId,
        subject: subject,
        title: title,
        summary: summary,
        duration: duration,
        klass: klass,
        author: 'Mr. Kondwani Phiri',
        quizId: quizId,
        custom: true,
        createdAt: new Date().toISOString(),
        content: S.parseContent(contentText)
      });
      D.saveLessons(list);

      S.toast('Lesson published. Your students can read it now.');
      form.reset();
      builder.hidden = true;
      attach.checked = false;
      rows.innerHTML = questionRow(0);
      renderMyLessons();
      window.scrollTo(0, 0);
    });

    document.getElementById('reset-form').addEventListener('click', function () {
      builder.hidden = true;
      attach.checked = false;
    });

    renderMyLessons();

    function renderMyLessons() {
      var list = document.getElementById('my-lessons');
      var lessons = D.getLessons().slice().reverse();
      list.innerHTML = lessons.map(function (l) {
        return '<div class="row-item">' +
          '<span class="row-icon">' + S.icon(S.subjectIcon(l.subject)) + '</span>' +
          '<span class="row-body"><b>' + S.esc(l.title) + '</b>' +
            '<span>' + S.esc(l.subject) + ' \u00B7 ' + S.esc(l.klass) + ' \u00B7 ' + l.duration + ' min' +
            (l.quizId ? ' \u00B7 includes a quiz' : '') + '</span></span>' +
          '<span class="row-side">' +
            '<span class="badge ' + (l.custom ? 'badge-progress' : 'badge-todo') + '">' +
              (l.custom ? 'New' : 'Built-in') + '</span>' +
            (l.custom
              ? '<button type="button" class="icon-btn icon-btn--danger" data-del="' + l.id + '" aria-label="Delete ' + S.esc(l.title) + '">' +
                  S.icon('trash') + '</button>'
              : '') +
          '</span>' +
        '</div>';
      }).join('');
    }

    document.getElementById('my-lessons').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-del]');
      if (!btn) return;
      var id = btn.dataset.del;
      S.confirmDialog({
        title: 'Delete this lesson?',
        message: 'The lesson and its attached quiz will be removed from the student library. This cannot be undone.',
        confirmText: 'Delete lesson',
        danger: true
      }).then(function (yes) {
        if (!yes) return;
        var list = D.getLessons();
        var gone = list.find(function (l) { return l.id === id; });
        D.saveLessons(list.filter(function (l) { return l.id !== id; }));
        if (gone && gone.quizId) {
          D.saveQuizzes(D.getQuizzes().filter(function (q) { return q.id !== gone.quizId; }));
        }
        S.toast('Lesson deleted.');
        renderMyLessons();
      });
    });
  }

  /* ---------------- Submissions ---------------- */
  function pageSubmissions() {
    var assignments = D.getAssignments();
    var table = document.getElementById('subs-table');
    var tbody = table.querySelector('tbody');
    var fAssignment = document.getElementById('f-assignment');
    var fStatus = document.getElementById('f-status');
    var search = document.getElementById('f-search');

    fAssignment.innerHTML = '<option value="all">All assignments</option>' +
      assignments.map(function (a) {
        return '<option value="' + a.id + '">' + S.esc(a.title) + '</option>';
      }).join('');

    function currentFilters() {
      return {
        assignment: fAssignment.value,
        status: fStatus.value,
        q: search.value.trim().toLowerCase()
      };
    }

    function render() {
      var f = currentFilters();
      var subs = D.getSubmissions().slice().sort(function (a, b) {
        return new Date(b.submittedAt) - new Date(a.submittedAt);
      }).filter(function (s) {
        var a = assignments.find(function (x) { return x.id === s.assignmentId; }) || {};
        if (f.assignment !== 'all' && s.assignmentId !== f.assignment) return false;
        if (f.status !== 'all' && s.status !== f.status) return false;
        if (f.q && (s.student + ' ' + (a.title || '')).toLowerCase().indexOf(f.q) === -1) return false;
        return true;
      });

      if (!subs.length) {
        tbody.innerHTML =
          '<tr><td colspan="6"><div class="empty">' +
            '<img src="../assets/images/ill-empty.svg" alt="" width="160" height="117">' +
            '<h3>Nothing matches these filters</h3>' +
            '<p>Try a different assignment, status or search word.</p>' +
          '</div></td></tr>';
        return;
      }

      tbody.innerHTML = subs.map(function (s) {
        var a = assignments.find(function (x) { return x.id === s.assignmentId; }) || {};
        var detailId = 'detail-' + s.id;
        return '<tr class="row-main" data-sub="' + s.id + '" aria-expanded="false" aria-controls="' + detailId + '" tabindex="0">' +
          '<td><span class="stu-cell">' +
            '<span class="avatar ' + S.avatarClass(s.student) + '" aria-hidden="true">' + S.initials(s.student) + '</span>' +
            '<span><b>' + S.esc(s.student) + '</b><span>' + S.esc(s.klass) + '</span></span>' +
          '</span></td>' +
          '<td>' + S.esc(a.title || '\u2014') + '</td>' +
          '<td>' + S.esc(a.subject || '') + '</td>' +
          '<td><time datetime="' + s.submittedAt + '">' + S.fmtStamp(s.submittedAt) + '</time></td>' +
          '<td>' + STATUS_BADGE[s.status] + '</td>' +
          '<td>' + (s.status === 'graded' ? '<b>' + s.score + '%</b>' : '\u2014') + '</td>' +
        '</tr>' +
        '<tr class="row-detail" id="' + detailId + '" hidden>' +
          '<td colspan="6"><div class="detail-grid">' +
            '<div class="detail-left">' +
              '<h4>' + S.esc(a.title || 'Submission') + ' \u00B7 handed in ' + S.fmtStamp(s.submittedAt) + '</h4>' +
              (a.brief ? '<p class="hint">' + S.esc('Brief: ' + a.brief) + '</p>' : '') +
              '<div class="submission-text">' + S.esc(s.text) + '</div>' +
            '</div>' +
            '<div class="detail-right">' +
              '<h4>Assessment</h4>' +
              (s.status === 'graded'
                ? '<p class="stat-num" style="font-size:1.9rem">' + s.score + '%</p>' +
                  '<div class="feedback-summary"><b>Feedback given:</b> ' + S.esc(s.feedback) + '</div>'
                : '<form class="grade-form" data-grade="' + s.id + '">' +
                    '<div class="score-input">' +
                      '<input type="number" class="input" min="0" max="100" required aria-label="Score out of 100" placeholder="86">' +
                      '<span>out of 100</span>' +
                    '</div>' +
                    '<textarea class="input" rows="3" required aria-label="Feedback" placeholder="Encouraging feedback for the pupil..."></textarea>' +
                    '<button type="submit" class="btn btn-primary btn-sm">' + S.icon('check') + ' Save grade</button>' +
                  '</form>') +
            '</div>' +
          '</div></td>' +
        '</tr>';
      }).join('');
    }

    tbody.addEventListener('click', function (e) {
      if (e.target.closest('form, input, textarea, button')) return;
      var row = e.target.closest('tr.row-main');
      if (row) toggle(row);
    });
    tbody.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var row = e.target.closest('tr.row-main');
      if (row) { e.preventDefault(); toggle(row); }
    });

    function toggle(row) {
      var detail = document.getElementById('detail-' + row.dataset.sub);
      var open = detail.hidden;
      detail.hidden = !open;
      row.classList.toggle('is-open', open);
      row.setAttribute('aria-expanded', String(open));
    }

    tbody.addEventListener('submit', function (e) {
      var form = e.target.closest('form[data-grade]');
      if (!form) return;
      e.preventDefault();
      var id = form.dataset.grade;
      var score = Number(form.querySelector('input[type="number"]').value);
      var feedback = form.querySelector('textarea').value.trim();
      if (isNaN(score) || score < 0 || score > 100) {
        S.toast('Enter a score between 0 and 100.', 'error');
        return;
      }
      if (!feedback) {
        S.toast('Add a short line of feedback for the pupil.', 'error');
        return;
      }
      var subs = D.getSubmissions();
      var sub = subs.find(function (s) { return s.id === id; });
      if (sub) {
        sub.score = Math.round(score);
        sub.feedback = feedback;
        sub.status = 'graded';
        D.saveSubmissions(subs);
        S.toast('Graded ' + sub.student + '\u2019s work. ' + sub.score + '% saved.');
        render();
      }
    });

    [fAssignment, fStatus].forEach(function (el) {
      el.addEventListener('change', render);
    });
    search.addEventListener('input', render);

    render();
  }

  /* ---------------- Router ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    S.initShell();
    D.ensureSeed();

    var page = document.body.dataset.page;
    if (page === 'teacher-dashboard') pageDashboard();
    else if (page === 'teacher-create-lesson') pageCreateLesson();
    else if (page === 'teacher-submissions') pageSubmissions();
  });
})();
