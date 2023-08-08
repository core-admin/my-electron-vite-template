import 'reflect-metadata';
import { app } from 'electron';
import { frontInit, appReadyInit } from './internal';

console.log(process.versions.node, process.versions.modules);

frontInit();
app.whenReady().then(() => appReadyInit());
