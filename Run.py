# Tailwind configurations
Tail_input_file = "./src/styles/index.css"
Tail_output_file = "./build/styles/index.css"

# TypeScript configurations
TSC_input_file = "./src/ts/index.ts"
TSC_output_directory = "./build/js/category/"

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
        filepath = provide_file_path(filepath)
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

def provide_file_path(path):
    path = path.replace("/", os.sep)
    path = path.replace("\\", os.sep)
    return path

def path_equivalent(filepath):
    pages_path = provide_file_path("./src/pages")
    build_path = provide_file_path("./build")
    new_path = filepath.replace(pages_path, "")
    new_path = new_path.replace("ejs", "html")
    new_path = build_path + new_path
    return new_path

def is_layout(path):
    if "layouts" not in path:
        return False
    elif "components" not in path:
        return False
    else:
        return True

def generateEJS(inp_file, out_file):
    out_dir = os.path.dirname(out_file)
    if not os.path.exists(out_dir):
        os.makedirs(out_dir)
    system(f"ejs {inp_file} -o {out_file}")

def generate_Ejs_files(list_or_dict):
    if not isinstance(list_or_dict, dict) and not isinstance(list_or_dict, list):
        raise Exception("generate_Ejs_files func : Bad argument !")
    for filepath in list_or_dict:
        if not is_layout(filepath):
            new_path = path_equivalent(filepath)
            generateEJS(filepath, new_path)

def delete_html(filepath):
    out_dir = os.path.dirname(filepath)
    if os.path.exists(filepath):
        os.remove(filepath)
        if not os.listdir(out_dir):
            os.rmdir(out_dir)

def delete_html_files(list_or_dict):
    if not isinstance(list_or_dict, dict) and not isinstance(list_or_dict, list):
        raise Exception("delete_html_files func : Bad argument !")
    for filepath in list_or_dict:
        if not is_layout(filepath):
            eq_path = path_equivalent(filepath)
            delete_html(eq_path)
    

def on_change(added_or_modified, deleted):
    if added_or_modified:
        print(f"Ejs : Added or modified: {added_or_modified}")
        generate_all = False
        for filepath in added_or_modified:
            if is_layout(filepath):
                generate_all = True
                break
        if generate_all:
            generate_Ejs_files(get_files(Ejs_input_directory))
        else:
            generate_Ejs_files(added_or_modified)
    if deleted:
        print(f"Deleted: {deleted}")
        delete_html_files(deleted)

def watch_file(filepath, interval=1):

    if not os.path.isfile(filepath):
        raise FileNotFoundError(f"No such file: '{filepath}'")
    
    last_modified_time = os.path.getmtime(filepath)
    
    while True:
        time.sleep(interval)
        current_modified_time = os.path.getmtime(filepath)
        
        if current_modified_time != last_modified_time:
            print(f"Ejs : The file '{filepath}' has been modified.")
            generateEJS(Ejs_input_file, Ejs_output_file)
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


