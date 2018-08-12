# Parcel Electron Starter

This is my customized starter project for Electron.

## Scripts

- `dev`: Starts parcel to build src/* and attaches a electron process
- `start`: Starts electron

## Folders

### ./src

Your renderer source code goes here, since i don't transpile the main process code at all.

### ./app

This is the code actually used by electron, it has two subfolders for each of the process. `Main` and `Renderer`, this is very usefull since it prevents you from mixing up the two processes.
