const express = require ('express');
const router = express.Router ();
const askSomethingQuestion = require ('../models/askSomethingQuestion');
const user = require ('../models/user');
const askSomethingAnswer = require ('../models/askSomethingAnswer');

router.use (express.json ());

router.post ('/question/reverse-time-sort', (req, res) => {
  console.log('reverse sort');
  askSomethingQuestion
    .find ({})
    .sort ({"time": -1})
    .then (question => res.json (question))
    .catch (err => console.log ('from ask-something.js ' + err));
});

router.post ('/question/user-list', (req, res) => {
  const {user} = req.body;

  askSomethingQuestion
    .find ({})
    .sort ({"time": -1})
    .then (questions => {
      const listFromUser = questions.filter (
        question => question.by === user._id
      );

      res.json (listFromUser);
    })
    .catch (err => console.log ('from ask-something.js ' + err));
});

router.post ('/question/user-likes', (req, res) => {
  const {user} = req.body;

  askSomethingQuestion
    .find ({})
    .sort ({"time": -1})
    .then (questions => {
      const listFromUser = questions.filter (question => {
        const found = question.liked.find (userIds => userIds === user._id);

        if (found) return true;
        else return false;
      });

      res.json (listFromUser);
    })
    .catch (err => console.log ('from ask-something.js ' + err));
});

router.post ('/question/user-dislikes', (req, res) => {
  const {user} = req.body;

  askSomethingQuestion
    .find ({})
    .sort ({"time": -1})
    .then (questions => {
      const listFromUser = questions.filter (question => {
        const found = question.disliked.find (userIds => userIds === user._id);

        if (found) return true;
        else return false;
      });

      res.json (listFromUser);
    })
    .catch (err => console.log ('from ask-something.js ' + err));
});

router.post ('/question/time-sort', (req, res) => {
  console.log('time sort')
  askSomethingQuestion
    .find ({})
    .sort ({"time": 1})
    .then (questions => res.json (questions))
    .catch (err => console.log ('from ask-something.js ' + err));
});

router.post ('/question/check', async (req, res) => {
  try {
    const {userId, questionId} = req.body;

    await askSomethingQuestion
      .findById (questionId)
      .then (resp => {
        if (resp) {
          const LikeId = resp.liked.find (likeId => likeId === userId);

          if (LikeId) {
            return res.send ('liked');
          }
          const dislikeId = resp.disliked.find (
            dislikeId => dislikeId === userId
          );

          if (dislikeId) {
            return res.send ('disliked');
          }
          return res.send ('none');
        } else {
          return res.send ('none');
        }
      })
      .catch (err => console.log (err));
  } catch (err) {
    console.log (err);
    res.send ('some error');
  }
});

router.post ('/question/add', async (req, res) =>   {
  try{
  const question = req.body;
  let user_image = '';
  let user_name = '';

  console.log(question);
  await user
    .findById (question.by)
    .then (resp => {
      user_image = resp.imageUrl;
      user_name = resp.name;
    })
    .catch (err => console.log (err));

  const newQuestion = await new askSomethingQuestion ({
    title: question.title,
    question: question.question,
    by: question.by,
    answers: [],
    liked: [],
    disliked: [],
    userName: user_name,
    userImage: user_image,
  });

  await newQuestion
    .save ()
    .then (question => res.json (question))
    .catch (err => console.log (err));
}catch{(err) => console.log("outside try" + err);}
});

router.put ('/question/addLike', async (req, res) => {
  try {
    const {userId, questionId} = req.body;

    let newListLike, newListDislike;

    await askSomethingQuestion
      .findById (questionId)
      .then (resp => {
        newListLike = resp.liked.filter (idd => idd !== userId);
        newListDislike = resp.disliked.filter (idd => idd !== userId);
      })
      .catch (err => console.log (err));

    newListLike.push (userId);
    console.log (newListLike);
    console.log (newListDislike);

    await askSomethingQuestion.findByIdAndUpdate (
      questionId,
      {
        liked: newListLike,
        disliked: newListDislike,
      },
      (err, result) => {
        if (err) {
          console.log (err);
        } else {
          console.log ('updated : ', result);
        }
      }
    );
    res.send ('ook');
  } catch (err) {
    console.log (err);
    res.send ('some error');
  }
});

router.put ('/question/addDislike', async (req, res) => {
  try {
    const {userId, questionId} = req.body;

    let newListLike, newListDislike;

    await askSomethingQuestion
      .findById (questionId)
      .then (resp => {
        newListLike = resp.liked.filter (idd => idd !== userId);
        newListDislike = resp.disliked.filter (idd => idd !== userId);
      })
      .catch (err => console.log (err));

    newListDislike.push (userId);
    console.log (newListLike);
    console.log (newListDislike);

    await askSomethingQuestion.findByIdAndUpdate (
      questionId,
      {
        liked: newListLike,
        disliked: newListDislike,
      },
      {new: true},
      (err, result) => {
        if (err) {
          console.log (err);
        } else {
          console.log ('updated : ', result);
        }
      }
    );

    res.send ('ook');
  } catch (err) {
    console.log (err);
    res.send ('some error');
  }
});

module.exports = router;
