/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote: Note;
  createUser: User;
  deleteNote: Note;
  updateNote: Note;
  updateUser: User;
};


export type MutationCreateNoteArgs = {
  data: NoteCreateInput;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationDeleteNoteArgs = {
  id: Scalars['String'];
};


export type MutationUpdateNoteArgs = {
  data: NoteUpdateInput;
};


export type MutationUpdateUserArgs = {
  user: UserUpdateInput;
};

export type Note = {
  __typename?: 'Note';
  author: User;
  createdAt: Scalars['Timestamp'];
  description: Scalars['String'];
  id: Scalars['String'];
  updatedAt?: Maybe<Scalars['Timestamp']>;
  userId: Scalars['String'];
};

export type NoteCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type NoteUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allNotes: Array<Note>;
  allUsers: Array<User>;
  findNote: Note;
  findUser: User;
};


export type QueryFindNoteArgs = {
  id: Scalars['String'];
};


export type QueryFindUserArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Timestamp'];
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  notes?: Maybe<Array<Note>>;
  updatedAt?: Maybe<Scalars['Timestamp']>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  name: Scalars['String'];
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Timestamp']>;
};

export type AllNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllNotesQuery = { __typename?: 'Query', allNotes: Array<{ __typename?: 'Note', id: string, description: string, updatedAt?: any | null }> };

export type FindUserQueryVariables = Exact<{
  findUserId: Scalars['String'];
}>;


export type FindUserQuery = { __typename?: 'Query', findUser: { __typename?: 'User', name: string, notes?: Array<{ __typename?: 'Note', id: string, description: string, updatedAt?: any | null }> | null } };


export const AllNotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllNotes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allNotes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AllNotesQuery, AllNotesQueryVariables>;
export const FindUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"findUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"findUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"notes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<FindUserQuery, FindUserQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote: Note;
  createUser: User;
  deleteNote: Note;
  updateNote: Note;
  updateUser: User;
};


export type MutationCreateNoteArgs = {
  data: NoteCreateInput;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationDeleteNoteArgs = {
  id: Scalars['String'];
};


export type MutationUpdateNoteArgs = {
  data: NoteUpdateInput;
};


export type MutationUpdateUserArgs = {
  user: UserUpdateInput;
};

export type Note = {
  __typename?: 'Note';
  author: User;
  createdAt: Scalars['Timestamp'];
  description: Scalars['String'];
  id: Scalars['String'];
  updatedAt?: Maybe<Scalars['Timestamp']>;
  userId: Scalars['String'];
};

export type NoteCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type NoteUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allNotes: Array<Note>;
  allUsers: Array<User>;
  findNote: Note;
  findUser: User;
};


export type QueryFindNoteArgs = {
  id: Scalars['String'];
};


export type QueryFindUserArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Timestamp'];
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  notes?: Maybe<Array<Note>>;
  updatedAt?: Maybe<Scalars['Timestamp']>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  name: Scalars['String'];
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Timestamp']>;
};
