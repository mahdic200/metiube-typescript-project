# Tailwind configurations
Tail_input_file = "./src/styles/index.css"
Tail_output_file = "./build/styles/index.css"

# TypeScript configurations
TSC_input_file = "./src/ts/index.ts"
TSC_output_directory = "./build/js"

# Ejs configurations
Ejs_input_directory = "./src/pages"
Ejs_input_file = "./src/pages/index.ejs"
Ejs_output_file = "./build/index.html"
Ejs_interval = 0.1


import os
import time
from os import system
from threading import Thread


def get_files(directory):
    """Get a dictionary of file paths and their last modified times."""
    files = {}
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)
        if os.path.isfile(filepath):
            files[filepath] = os.path.getmtime(filepath)
        elif os.path.isdir(filepath):
            files |= get_files(filepath)
    return files

def watch_directory(directory, action, interval=1):
    """
    Watch the directory for changes and execute the action function when changes are detected.
    
    Parameters:
        directory (str): The directory to watch.
        action (function): The function to execute when changes are detected.
        interval (int): The interval in seconds to check for changes.
    """
    previous_files = get_files(directory)
    
    while True:
        time.sleep(interval)
        current_files = get_files(directory)
        
        # Check for added or modified files
        added_or_modified = [
            filepath for filepath in current_files
            if filepath not in previous_files or current_files[filepath] > previous_files[filepath]
        ]
        
        # Check for deleted files
        deleted = [
            filepath for filepath in previous_files
            if filepath not in current_files
        ]
        
        if added_or_modified or deleted:
            action(added_or_modified, deleted)
            previous_files = current_files

def on_change(added_or_modified, deleted):
    """
    Action to perform when changes are detected.
    
    Parameters:
        added_or_modified (list): List of added or modified file paths.
        deleted (list): List of deleted file paths.
    """
    system(f"ejs {Ejs_input_file} -o {Ejs_output_file}")
    if added_or_modified:
        print(f"Ejs : Added or modified: {added_or_modified}")
    if deleted:
        print(f"Deleted: {deleted}")

def watch_file(filepath, interval=1):

    if not os.path.isfile(filepath):
        raise FileNotFoundError(f"No such file: '{filepath}'")
    
    last_modified_time = os.path.getmtime(filepath)
    
    while True:
        time.sleep(interval)
        current_modified_time = os.path.getmtime(filepath)
        
        if current_modified_time != last_modified_time:
            print(f"Ejs : The file '{filepath}' has been modified.")
            system(f"ejs {Ejs_input_file} -o {Ejs_output_file}")
            last_modified_time = current_modified_time


def Ejs():
    if os.path.exists(Ejs_input_directory):
        watch_directory(Ejs_input_directory, on_change, Ejs_interval)
    else:
        watch_file(Ejs_input_file, interval=Ejs_interval)



def RunTail():
    system(f"tailwindcss -i {Tail_input_file} -o {Tail_output_file} --watch")


def RunTsc():
    system(f"tsc {TSC_input_file} --outDir {TSC_output_directory} --watch")


threads = [
    Thread(target=Ejs),
    Thread(target=RunTail),
    Thread(target=RunTsc),
]


# starting threads
for thread in threads:
    thread.start()
# joining threads
for thread in threads:
    thread.join()


