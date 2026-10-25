/* ============================================================
   Starlight Primary School — data layer
   Seeds demo content into localStorage on first visit so both
   portals share the same lessons, quizzes and submissions.
   ============================================================ */
(function () {
  'use strict';

  var STORE_KEY = 'sls.v1';
  var DAY = 24 * 60 * 60 * 1000;

  function hoursAgo(n) { return new Date(Date.now() - n * 3600 * 1000).toISOString(); }
  function daysAgo(n) { return hoursAgo(n * 24); }
  function inDays(n) { return new Date(Date.now() + n * DAY).toISOString().slice(0, 10); }

  /* ---------------- Seed content ---------------- */

  var lessons = [
    {
      id: 'l1',
      subject: 'Mathematics',
      title: 'Understanding Fractions',
      summary: 'Discover what fractions really mean, meet the numerator and denominator, and spot fractions hiding in your kitchen at home.',
      duration: 25,
      klass: 'Standard 4',
      author: 'Mr. Kondwani Phiri',
      quizId: 'q1',
      custom: false,
      content: [
        { t: 'p', x: 'Last week, Amina and her brother were given one mandasi to share. They cut it straight down the middle so that each of them got exactly the same amount. That fair share has a proper mathematical name: a fraction. In this lesson we will learn how fractions are written, what each number means, and where to find them all around us.' },
        { t: 'h2', x: 'What is a fraction?' },
        { t: 'p', x: 'A fraction names one or more equal parts of a whole. The whole could be an orange, a chocolate bar, a class of pupils, or an hour of the day. The most important word in that sentence is equal. The parts must be exactly the same size, otherwise it is not a fair fraction.' },
        { t: 'p', x: 'A fraction is written with two numbers and a line between them, like 3/4. The bottom number is called the denominator. It tells us how many equal parts the whole was divided into. The top number is the numerator. It tells us how many of those parts we are talking about.' },
        { t: 'fig', src: 'fraction-bars', cap: 'One half, one third and three quarters of each bar are shaded.' },
        { t: 'h2', x: 'Fractions hiding around you' },
        { t: 'ul', items: [
          'Half an orange (1/2) — cut from top to bottom, straight through the middle.',
          'A quarter of an hour (1/4) — fifteen minutes out of the sixty in a full hour.',
          'A third of a glass of juice (1/3) — imagine the glass divided into three equal levels.',
          'Three quarters of the class (3/4) — if 3 out of every 4 pupils walked to school.'
        ] },
        { t: 'h2', x: 'Try it yourself' },
        { t: 'p', x: 'Suppose a pizza is cut into 8 equal slices and you eat 2 of them. You have eaten 2/8 of the pizza. Here is a useful secret: 2/8 is exactly the same amount as 1/4, because eating one slice out of every four is the same as eating two out of every eight. Fractions can wear different clothes and still be the same fraction.' },
        { t: 'note', x: 'Key words to remember: numerator (top), denominator (bottom) and equal parts. Say each one out loud three times. It works.' }
      ]
    },
    {
      id: 'l2',
      subject: 'English',
      title: 'Nouns and Verbs',
      summary: 'Every sentence is built from building blocks. Learn to spot the naming words and the doing or being words.',
      duration: 20,
      klass: 'Standard 4',
      author: 'Mrs. Tiwonge Banda',
      quizId: 'q2',
      custom: false,
      content: [
        { t: 'p', x: 'A sentence is like a small machine made of parts that fit together. If you know the parts, you can build sentences that say exactly what you mean, and you can take a strange sentence apart to see why it sounds odd. Today we meet the two most important parts of all.' },
        { t: 'h2', x: 'Nouns: the naming words' },
        { t: 'p', x: 'A noun is a word that names something. Some nouns name people, like teacher, Chikondi and doctor. Some name places, like Blantyre, school and market. Some name things, like desk, ball and rain. And some name things you cannot touch, like kindness, Tuesday and honesty. Those are just as much nouns as all the others.' },
        { t: 'h2', x: 'Verbs: the doing and being words' },
        { t: 'p', x: 'A verb tells us what something does, or what something is. Action verbs are easy to spot: run, read, sing, kick, laugh and climb all describe things you can picture somebody doing. Being verbs are quieter: is, are, was and seem do not describe an action, but a sentence still needs one of them to hold it together.' },
        { t: 'h2', x: 'Putting them together' },
        { t: 'p', x: 'The simplest complete sentence needs only a noun and a verb working as a team. Birds sing. Tapiwa reads. The bell rang. Two words, and already a whole idea has been spoken. To find the verb in a longer sentence, ask: what is happening? To find the noun, ask: who or what is it happening to?' },
        { t: 'ul', items: [
          'The tall goalkeeper caught the ball. Nouns: goalkeeper, ball. Verb: caught.',
          'Memory walks to school with her cousins. Nouns: Memory, school, cousins. Verb: walks.',
          'The porridge was hot. Noun: porridge. Verb: was, a being verb.'
        ] },
        { t: 'note', x: 'Quick test: if you can put the word "the" in front of it — the teacher, the rain — it is probably a noun.' }
      ]
    },
    {
      id: 'l3',
      subject: 'Science',
      title: 'The Water Cycle',
      summary: 'Follow a drop of water on its endless journey from the Shire River to the clouds and back again.',
      duration: 30,
      klass: 'Standard 5',
      author: 'Mr. Kondwani Phiri',
      quizId: 'q3',
      custom: false,
      content: [
        { t: 'p', x: 'The water in your cup this morning may once have floated over Mount Mulanje as a cloud, or splashed into the Shire River a hundred years ago. Water never really sits still. It travels in a great loop that we call the water cycle, and it has been repeating that journey for millions of years.' },
        { t: 'h2', x: 'The four stages of the journey' },
        { t: 'ul', items: [
          'Evaporation — the sun heats rivers, lakes and the sea. Invisible water vapour rises into the air, leaving salts and dirt behind.',
          'Condensation — high above, the air is cold. The vapour cools into tiny droplets that crowd together as clouds.',
          'Precipitation — when the droplets grow heavy, they fall as rain, hail or snow. In Malawi, our rains arrive between November and April.',
          'Collection — the fallen water gathers in streams, rivers, lakes and under the ground, waiting for the sun to lift it skywards once more.'
        ] },
        { t: 'fig', src: 'water-cycle', cap: 'The water cycle: evaporation, condensation, precipitation and collection, all powered by the sun.' },
        { t: 'h2', x: 'Why the cycle matters' },
        { t: 'p', x: 'The water cycle is the reason we have fresh water to drink, rivers to fish in and rain for our maize gardens. It also cleans water on the way. When water evaporates it leaves salt and dirt behind, so the rain that falls is fresh. This is why we must keep our rivers clean: every drop we pollute is a drop the cycle has to carry around again.' },
        { t: 'note', x: 'New words: evaporation, condensation, precipitation, collection. Try using each one in a sentence about yesterday\u2019s weather.' }
      ]
    },
    {
      id: 'l4',
      subject: 'Mathematics',
      title: 'Telling the Time',
      summary: 'Meet the hour hand and the minute hand, and learn to read o\u2019clock and half past times with confidence.',
      duration: 20,
      klass: 'Standard 3',
      author: 'Mrs. Tiwonge Banda',
      quizId: 'q4',
      custom: false,
      content: [
        { t: 'p', x: 'A clock face is a number line bent into a circle. The short, chunky hand is the hour hand. It moves slowly, finishing one full lap every twelve hours. The long hand is the minute hand. It is the sprinter, finishing one full lap every hour. When you know which hand is which, half of telling the time is already done.' },
        { t: 'h2', x: 'Reading the hands' },
        { t: 'p', x: 'When the minute hand points straight up to the 12, we say the time is an o\u2019clock. The hour hand then tells you which o\u2019clock it is. If the short hand points at the 3 and the long hand at the 12, it is exactly 3 o\u2019clock, which is assembly time at many schools.' },
        { t: 'fig', src: 'clock', cap: 'This clock shows half past four. The long hand points down to the 6; the short hand sits halfway between the 4 and the 5.' },
        { t: 'h2', x: 'O\u2019clock and half past' },
        { t: 'p', x: 'When the minute hand has walked halfway around the circle and points down at the 6, thirty minutes have passed. That is half past. The hour hand no longer points exactly at a number. It sits halfway between this hour and the next one, because the hour itself is only half finished.' },
        { t: 'ul', items: [
          'Long hand on the 12, short hand on the 7. It is 7 o\u2019clock, time to wake up.',
          'Long hand on the 6, short hand just past the 12. It is half past 12, lunchtime.',
          'Long hand on the 6, short hand between the 8 and the 9. It is half past 8, time for the first lesson.'
        ] },
        { t: 'note', x: 'Practise on a real clock at home. Read the time out loud every time you walk past it.' }
      ]
    },
    {
      id: 'l5',
      subject: 'English',
      title: 'Reading: The Ant and the Dove',
      summary: 'A classic story about a small act of kindness that is repaid in a big way. Read it, then test your understanding.',
      duration: 15,
      klass: 'Standard 5',
      author: 'Mrs. Tiwonge Banda',
      quizId: 'q5',
      custom: false,
      content: [
        { t: 'h2', x: 'The story' },
        { t: 'p', x: 'On a hot afternoon, a thirsty little ant walked down to a stream to drink. She climbed onto a smooth pebble, leaned over the water, and slipped in. The current pulled her along. She paddled with all six legs, but the stream was too strong for such a small creature, and it carried her towards the deep water.' },
        { t: 'p', x: 'A dove was resting on a branch above the stream. She saw the ant struggling, and she understood at once what was about to happen. Quickly, she plucked a large leaf and let it fall onto the water beside the ant. The ant climbed aboard, dried her legs in the sun, and walked safely to the bank.' },
        { t: 'p', x: 'Some days later, the ant looked up and saw a hunter creeping towards the dove\u2019s tree with his net ready. The dove had not seen him. The ant ran up the hunter\u2019s boot and bit him as hard as she could. The hunter cried out, the dove heard him and flew away, and the small kindness was repaid in full.' },
        { t: 'h2', x: 'What the story teaches' },
        { t: 'p', x: 'No good deed is ever too small to matter. The dove gave a leaf; the ant gave a bite. Neither cost much, but together they saved two lives. Kindness has a way of travelling in a circle, exactly like that.' },
        { t: 'h2', x: 'Think about it' },
        { t: 'ul', items: [
          'Why could the ant not swim to the bank by herself?',
          'What did the dove risk by helping, and what did the ant risk later?',
          'Can you remember a time when a small favour helped you in a big way?'
        ] }
      ]
    },
    {
      id: 'l6',
      subject: 'Social Studies',
      title: 'People Who Help Us',
      summary: 'From nurses to farmers, meet the people whose work keeps a community healthy, fed and safe.',
      duration: 20,
      klass: 'Standard 4',
      author: 'Mr. Yankho Chirwa',
      quizId: 'q6',
      custom: false,
      content: [
        { t: 'p', x: 'Think about the first hour of your day. Bread reached the shop because a farmer grew the wheat and a driver carried it. The clinic was clean because someone swept it. The road was safe because someone watched over it. A community is like a big team, and today we meet the players.' },
        { t: 'h2', x: 'The helpers all around us' },
        { t: 'ul', items: [
          'Teachers guide us through new knowledge and help us practise until we can do it on our own.',
          'Nurses and doctors care for us when we are sick and teach us how to stay well.',
          'Farmers grow the maize, vegetables and fruit that feed every one of us, three times a day.',
          'Police officers and traffic officers keep our roads and neighbourhoods safe and fair.',
          'Firefighters rescue people and property when danger strikes.',
          'Cleaners and refuse collectors protect our health by keeping our streets tidy.'
        ] },
        { t: 'h2', x: 'How we show appreciation' },
        { t: 'p', x: 'Respect is the best thank-you a community can give. Greet the people who serve you, follow their guidance, and never take their work for granted. And remember: one day you will be a helper too. A coach, a tailor, an electrician, a nurse. Every skill you learn at school is a way of preparing to help.' },
        { t: 'note', x: 'Task: choose one helper in your community and write two sentences about how their work touches your family.' }
      ]
    }
  ];

  var quizzes = [
    { id: 'q1', lessonId: 'l1', title: 'Understanding Fractions — Quiz', questions: [
      { q: 'What does the bottom number (denominator) of a fraction tell us?',
        options: ['How many equal parts the whole is divided into', 'How many parts we have taken', 'The biggest fraction in the sum', 'Nothing, it is just decoration'], answer: 0 },
      { q: 'One of two equal parts of an orange is shaded. Which fraction is that?',
        options: ['1/4', '1/2', '2/1', '1/3'], answer: 1 },
      { q: 'What is 1/4 of 12 mangoes?',
        options: ['2', '4', '3', '6'], answer: 2 },
      { q: 'Which of these fractions is the biggest?',
        options: ['1/8', '1/4', '1/3', '1/2'], answer: 3 },
      { q: 'What is 2/8 written in its simplest form?',
        options: ['1/4', '2/4', '1/8', '4/2'], answer: 0 }
    ]},
    { id: 'q2', lessonId: 'l2', title: 'Nouns and Verbs — Quiz', questions: [
      { q: 'In the sentence "Sara reads a book", which word is a noun?',
        options: ['reads', 'a', 'book', 'and'], answer: 2 },
      { q: 'Which of these words is a verb?',
        options: ['table', 'run', 'yellow', 'school'], answer: 1 },
      { q: 'Which of these is a noun that names a place?',
        options: ['hospital', 'jump', 'quickly', 'happy'], answer: 0 },
      { q: 'Which word is the verb in "The bell rings at eight o\u2019clock"?',
        options: ['bell', 'eight', 'rings', 'o\u2019clock'], answer: 2 }
    ]},
    { id: 'q3', lessonId: 'l3', title: 'The Water Cycle — Quiz', questions: [
      { q: 'The sun heats the river and water rises into the air as vapour. This stage is called...',
        options: ['collection', 'evaporation', 'precipitation', 'condensation'], answer: 1 },
      { q: 'Clouds form during which stage of the water cycle?',
        options: ['condensation', 'collection', 'evaporation', 'precipitation'], answer: 0 },
      { q: 'Rain, hail and snow are all examples of...',
        options: ['evaporation', 'collection', 'condensation', 'precipitation'], answer: 3 },
      { q: 'Water gathering in rivers, lakes and under the ground is called...',
        options: ['precipitation', 'collection', 'condensation', 'evaporation'], answer: 1 },
      { q: 'What powers the whole water cycle?',
        options: ['The wind', 'The moon', 'The sun', 'The clouds'], answer: 2 }
    ]},
    { id: 'q4', lessonId: 'l4', title: 'Telling the Time — Quiz', questions: [
      { q: 'The long hand points to the 12 and the short hand points to the 3. What time is it?',
        options: ['12 o\u2019clock', 'Half past 3', '3 o\u2019clock', 'A quarter to 3'], answer: 2 },
      { q: 'At half past 6, where does the minute hand point?',
        options: ['To the 12', 'To the 6', 'To the 3', 'To the 9'], answer: 1 },
      { q: 'How many hours pass between 8 o\u2019clock in the morning and 3 o\u2019clock in the afternoon?',
        options: ['5 hours', '6 hours', '8 hours', '7 hours'], answer: 3 },
      { q: 'The minute hand moves from the 12 all the way to the 6. How many minutes have passed?',
        options: ['15 minutes', '60 minutes', '45 minutes', '30 minutes'], answer: 3 }
    ]},
    { id: 'q5', lessonId: 'l5', title: 'The Ant and the Dove — Quiz', questions: [
      { q: 'Where did the ant fall?',
        options: ['Into a stream', 'Into a pit', 'Off a tree branch', 'Into a bucket'], answer: 0 },
      { q: 'How did the dove help the ant?',
        options: ['She pushed it with her wing', 'She dropped a leaf onto the water', 'She called other birds', 'She drank all the water'], answer: 1 },
      { q: 'How did the ant repay the dove later?',
        options: ['It carried the dove\u2019s food', 'It sang a song', 'It bit the hunter\u2019s boot', 'It built the dove a nest'], answer: 2 },
      { q: 'What is the lesson of the story?',
        options: ['Never go near water', 'Small acts of kindness are repaid', 'Hunters are dangerous', 'Ants are stronger than doves'], answer: 1 }
    ]},
    { id: 'q6', lessonId: 'l6', title: 'People Who Help Us — Quiz', questions: [
      { q: 'Who helps you when you are sick at the clinic?',
        options: ['A traffic officer', 'A farmer', 'A nurse', 'A firefighter'], answer: 2 },
      { q: 'Who grows the food that feeds the community?',
        options: ['A farmer', 'A cleaner', 'A teacher', 'A police officer'], answer: 0 },
      { q: 'Which is a good way to show appreciation to community helpers?',
        options: ['Greet them politely and follow their guidance', 'Take their work for granted', 'Leave litter behind', 'Make noise at the clinic'], answer: 0 }
    ]}
  ];

  var students = [
    'Tapiwa Banda', 'Chikondi Phiri', 'Yamikani Chirwa', 'Fatsani Mwale',
    'Zione Msiska', 'Gift Kumwenda', 'Memory Nkhoma', 'Praise Gondwe',
    'Blessings Zimba', 'Tiwonge Malunga'
  ].map(function (name) { return { name: name, klass: 'Standard 4' }; });

  var assignments = [
    { id: 'a1', title: 'Fractions Worksheet 1', subject: 'Mathematics', klass: 'Standard 4',
      brief: 'Shade the given fractions, then simplify your answers. Show your working for questions 3 and 4.',
      due: inDays(2) },
    { id: 'a2', title: 'Water Cycle Poster', subject: 'Science', klass: 'Standard 5',
      brief: 'Draw and label a poster showing all four stages of the water cycle. Use colour and name each stage clearly.',
      due: inDays(5) },
    { id: 'a3', title: 'Reading Log: Week 3', subject: 'English', klass: 'Standard 4',
      brief: 'Read for 15 minutes each day and write one sentence about what you read.',
      due: inDays(-1) },
    { id: 'a4', title: 'Community Helper Interview', subject: 'Social Studies', klass: 'Standard 4',
      brief: 'Interview one helper in your community and write down three things you learned.',
      due: inDays(7) }
  ];

  var submissions = [
    { id: 's1', assignmentId: 'a1', student: 'Tapiwa Banda', klass: 'Standard 4', submittedAt: hoursAgo(3),
      status: 'submitted', score: null, feedback: '',
      text: 'Q1: 1/2 shaded. Q2: 3/4 shaded. Q3: 4/8 simplifies to 1/2. Q4 was tricky but I used the method from the lesson and drew the bars first.' },
    { id: 's2', assignmentId: 'a1', student: 'Yamikani Chirwa', klass: 'Standard 4', submittedAt: daysAgo(1),
      status: 'late', score: null, feedback: '',
      text: 'Finished the worksheet last night after prep. I am not sure about my answer to question 3 — please check it, sir.' },
    { id: 's3', assignmentId: 'a1', student: 'Chikondi Phiri', klass: 'Standard 4', submittedAt: daysAgo(2),
      status: 'graded', score: 85, feedback: 'Neat work, Chikondi. Watch question 4: simplify 2/8 fully before you circle your answer.',
      text: 'Q1: 1/2. Q2: 3/4. Q3: 4/8 = 1/2. Q4: 2/8. Q5: I drew the fraction wall like we did in class.' },
    { id: 's4', assignmentId: 'a2', student: 'Fatsani Mwale', klass: 'Standard 4', submittedAt: hoursAgo(6),
      status: 'submitted', score: null, feedback: '',
      text: 'My poster shows the sun, a cloud, rain falling on a mountain and the river collecting the water. I labelled all four stages and coloured the arrows blue.' },
    { id: 's5', assignmentId: 'a2', student: 'Zione Msiska', klass: 'Standard 4', submittedAt: daysAgo(2),
      status: 'graded', score: 92, feedback: 'Excellent labels and colour coding, Zione. You even added the underground water. Well done.',
      text: 'I drew the cycle in four corners of my poster with arrows joining them. My grandmother helped me spell "evaporation".' },
    { id: 's6', assignmentId: 'a3', student: 'Memory Nkhoma', klass: 'Standard 4', submittedAt: daysAgo(3),
      status: 'graded', score: 78, feedback: 'Good reading habit, Memory. Two of your sentences are summaries — next time tell me what you thought about the story too.',
      text: 'Monday: The dove dropped a leaf for the ant. Tuesday: The hunter slipped on the path. Wednesday: I read about fractions and shared a mandasi. Thursday: Read about the water cycle with my brother.' },
    { id: 's7', assignmentId: 'a3', student: 'Gift Kumwenda', klass: 'Standard 4', submittedAt: daysAgo(2),
      status: 'submitted', score: null, feedback: '',
      text: 'I read the ant and the dove story three times. My favourite sentence is "kindness has a way of travelling in a circle".' },
    { id: 's8', assignmentId: 'a4', student: 'Praise Gondwe', klass: 'Standard 4', submittedAt: hoursAgo(4),
      status: 'submitted', score: null, feedback: '',
      text: 'I interviewed my auntie. She is a nurse at the clinic near the market. Three things I learned: she washes her hands more than twenty times a day, she checks babies first, and she walked a long way to school when she was my age.' },
    { id: 's9', assignmentId: 'a1', student: 'Blessings Zimba', klass: 'Standard 4', submittedAt: hoursAgo(5),
      status: 'submitted', score: null, feedback: '',
      text: 'Worksheet finished. I used a ruler to make my fraction bars straight. Question 5 was my best one.' },
    { id: 's10', assignmentId: 'a2', student: 'Tiwonge Malunga', klass: 'Standard 4', submittedAt: daysAgo(1),
      status: 'late', score: null, feedback: '',
      text: 'Sorry for handing in late, we had a family trip. My poster has the four stages and a sentence under each one explaining what happens.' }
  ];

  var progressSeed = { l1: 'completed', l2: 'in-progress', l4: 'in-progress' };
  var attemptsSeed = {
    q1: [{ at: daysAgo(2), score: 4, total: 5 }],
    q4: [{ at: daysAgo(1), score: 3, total: 4 }]
  };

  /* ---------------- Storage helpers ---------------- */

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (err) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) { /* storage unavailable — demo still renders from memory */ }
  }

  function ensureSeed() {
    if (read(STORE_KEY + '.seeded', false)) return;
    write(STORE_KEY + '.lessons', lessons);
    write(STORE_KEY + '.quizzes', quizzes);
    write(STORE_KEY + '.assignments', assignments);
    write(STORE_KEY + '.submissions', submissions);
    write(STORE_KEY + '.progress', progressSeed);
    write(STORE_KEY + '.attempts', attemptsSeed);
    write(STORE_KEY + '.students', students);
    write(STORE_KEY + '.seeded', true);
  }

  var SLSData = {
    ensureSeed: ensureSeed,

    getLessons: function () { return read(STORE_KEY + '.lessons', lessons); },
    saveLessons: function (list) { write(STORE_KEY + '.lessons', list); },

    getQuizzes: function () { return read(STORE_KEY + '.quizzes', quizzes); },
    saveQuizzes: function (list) { write(STORE_KEY + '.quizzes', list); },

    getAssignments: function () { return read(STORE_KEY + '.assignments', assignments); },

    getSubmissions: function () { return read(STORE_KEY + '.submissions', submissions); },
    saveSubmissions: function (list) { write(STORE_KEY + '.submissions', list); },

    getStudents: function () { return read(STORE_KEY + '.students', students); },

    getProgress: function () { return read(STORE_KEY + '.progress', {}); },
    setProgress: function (lessonId, state) {
      var p = read(STORE_KEY + '.progress', {});
      p[lessonId] = state;
      write(STORE_KEY + '.progress', p);
    },

    getAttempts: function () { return read(STORE_KEY + '.attempts', {}); },
    recordAttempt: function (quizId, attempt) {
      var all = read(STORE_KEY + '.attempts', {});
      if (!all[quizId]) all[quizId] = [];
      all[quizId].push(attempt);
      write(STORE_KEY + '.attempts', all);
    },
    bestAttempt: function (quizId) {
      var list = read(STORE_KEY + '.attempts', {})[quizId] || [];
      if (!list.length) return null;
      return list.reduce(function (best, a) {
        return (a.score / a.total) > (best.score / best.total) ? a : best;
      }, list[0]);
    }
  };

  window.SLSData = SLSData;
})();
