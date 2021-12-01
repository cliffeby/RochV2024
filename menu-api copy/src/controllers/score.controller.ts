import { Request, Response } from 'express';
import { Score, ScoreInput } from '../models/score.model';

const createScore = async (req: Request, res: Response) => {
  const { name, matchId,scorecardId,lineupIds, handicap, score,
    wonTwoBall, wonOneBall, wonIndo, memberIds, foursomeIds, partnerIds, datePlayed, user } = req.body;
  if (!name || !user) {
    console.log(
      'ScoreController - The fields firstName and lastName are required - create', req.body
    );
    return res.status(422).json({ message: 'The fields firstName and lastName are required - create' });
  }
  const scoreInput: ScoreInput = {
    name,
    matchId,
    scorecardId,
    lineupIds,
    handicap,
    score,
    wonTwoBall,
    wonOneBall,
    wonIndo,
    memberIds,
    foursomeIds,
    partnerIds,
    datePlayed,
    user
  };
  const scoreCreated = await Score.create(scoreInput);
  console.log('ScoreController - Post a score - Success');
  return res.status(201).json({scoreCreated });
};

const getAllScores = async (req: Request, res: Response) => {
  await Score.find().sort('lastName').exec(function(err, scores){
    console.log('Get request for all scores');
    if (err) {
        console.log('Error retrieving scores');
      } else {
    return res.status(200).json(scores);
      }
    })};

const getScore = async (req: Request, res: Response) => {
  const { id } = req.params;
  const score = await Score.findOne({ _id: id });
  if (!score) {
    console.log('Score with id ', id, ' not found - get.');
    return res.status(404).json({ message: `Score with id "${id}" not found - get.` });
  }
  console.log('Get request for a single score - success');
  return res.status(200).json({ score });
};

const updateScore = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, handicap, email, user } = req.body;
  const score = await Score.findOne({ _id: id });
  if (!score) {
    return res.status(404).json({ message: `Score with id "${id}" not found -update.` });
  }
  if (!firstName || !lastName) {
    return res.status(422).json({ message: 'The fields firstName and lastName are required - update' });
  }
  await Score.updateOne(
    { _id: id },
    { firstName, lastName, handicap, email, user }
  );
  const scoreUpdated = await Score.findById(id, {
    firstName,
    lastName,
    handicap,
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

export { createScore, deleteScore, getAllScores, getScore, updateScore };
