export enum ItemPermission {
  CreateItems = 'create:items',
  UpdateItems = 'update:items',
  DeleteItems = 'delete:items',
  CreateMember = 'create:member',
  ReadMembers = 'read:members',
  UpdateMember = 'update:member',
  DeleteMember = 'remove:member',
  CreateScorecard = 'create:scorecard',
  ReadScorecards = 'read:scorecards',
  UpdateScorecard = 'update:scorecard',
  DeleteScorecard = 'remove:scorecard',
  BadPermission = 'read:bad',
}
