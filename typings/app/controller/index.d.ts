// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUsers from '../../../app/controller/users';

declare module 'egg' {
  interface IController {
    users: ExportUsers;
  }
}
