import { Request, Response } from 'express';
import { Score, ScoreInput } from '../models/score.model';
import mongoose, { Schema, Model, Document, isValidObjectId } from 'mongoose';
import { ObjectId } from 'mongoose';
import { checkObjectId } from '../middleware/not-found.middleware';

const createScore = async (req: Request, res: Response) => {
  const {
    name,
    matchId,
    scorecardId,
    lineupIds,
    usgaIndex,
    score,
    wonTwoBall,
    wonOneBall,
    wonIndo,
    memberId,
    foursomeIds,
    partnerIds,
    datePlayed,
    user,
  } = req.body;
  console.log('Create score request', req.body);
  if (!name) {
    console.log(
      'ScoreController - The fields  are required - create1',
      req.body
    );
    return res
      .status(422)
      .json({
        message: 'The fields  are required - create2'
      });
  }
  const scoreInput: ScoreInput = {
    name,
    matchId,
    scorecardId,
    lineupIds,
    usgaIndex,
    score,
    wonTwoBall,
    wonOneBall,
    wonIndo,
    memberId,
    foursomeIds,
    partnerIds,
    datePlayed,
    user,
  };
  const scoreCreated = await Score.create(scoreInput);
  console.log('ScoreController - Post a score - Success');
  return res.status(201).json({ scoreCreated });
};

const getAllScores = async (req: Request, res: Response) => {
  await Score.find()
    .sort('lastName')
    .exec(function (err, scores) {
      console.log('Get request for all scores');
      if (err) {
        console.log('Error retrieving scores');
      } else {
        return res.status(200).json(scores);
      }
    });
};

const getScore = async (req: Request, res: Response) => {
  const { id } = req.params;
  const score = await Score.findOne({ _id: id });
  if (!score) {
    console.log('Score with id ', id, ' not found - get.');
    return res
      .status(404)
      .json({ message: `Score with id "${id}" not found - get.` });
  }
  console.log('Get request for a single score - success');
  return res.status(200).json({ score });
};

const updateScore = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, usgaIndex, email, user } = req.body;
  const score = await Score.findOne({ _id: id });
  if (!score) {
    return res
      .status(404)
      .json({ message: `Score with id "${id}" not found -update.` });
  }
  if (!firstName || !lastName) {
    return res
      .status(422)
      .json({
        message: 'The fields firstName and lastName are required - update',
      });
  }
  await Score.updateOne(
    { _id: id },
    { firstName, lastName, usgaIndex, email, user }
  );
  const scoreUpdated = await Score.findById(id, {
    firstName,
    lastName,
    usgaIndex,
    email,
    user,
  });
  console.log('ScoreController - Update a score - Success');
  return res.status(200).json({ scoreUpdated });
};

const deleteScore = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Score.findByIdAndDelete(id);
  console.log('Delete request for a single score - success', id);
  return res.status(200).json({ message: 'Score deleted successfully.' });
};

const getMatchScores = async (req: Request, res: Response) => {
  const id  = req.params.id.trim();
  if (!isValidObjectId(id)) {console.log('Invalid id'); return res.status(404).json({message: 'Invalid id'});}
  var query = { matchId: id };
  console.log('Request scores for a match', query);
  await Score.find(query).then((scores) => {
            res.status(200).json(scores);
        }).catch((err) => {
            console.log(err);

  });
};

// exports.getMatchScores = function (req, res) {
//   console.log('Get request for match scores');
//   Score.find({ matchId: req.params.id }).exec(function (err, score) {
//     if (err) {
//       console.log('Error retrieving match score');
//     } else {
//       res.json(score);
//     }
//   });
// };

export { createScore, deleteScore, getAllScores, getScore, updateScore, getMatchScores };
