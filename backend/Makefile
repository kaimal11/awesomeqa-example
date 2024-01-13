# # Set the name of the virtual environment
# VENV_ACTIVATE = .venv\Scripts\activate.bat
# VENV_NAME = .venv
# PYTHON_VERSION = 3

# venv:
# 	python$(PYTHON_VERSION) -m venv $(VENV_NAME)

# install:
# 	IF $(OS) == Windows_NT(
#     	$(VENV_ACTIVATE) && pip install -r requirements.txt
#     )ELSE(
#     	.	.venv/bin/activate && pip install -r requirements.txt
#     )

# setup: venv install	


# run:
# 	python -m app.main
# Set the name of the virtual environment
# Set the name of the virtual environment
VENV_ACTIVATE = .venv\Scripts\activate.bat
VENV_NAME = .venv
PYTHON_VERSION = 3

venv:
	python$(PYTHON_VERSION) -m venv $(VENV_NAME)

install:
	IF "$(OS)" == "Windows_NT" ($(VENV_ACTIVATE) && pip install -r requirements.txt) ELSE (. $(VENV_NAME)/bin/activate && pip install -r requirements.txt)

setup: venv install

install-uvicorn:
	IF "$(OS)" == "Windows_NT" ($(VENV_ACTIVATE) && pip install uvicorn) ELSE (. $(VENV_NAME)/bin/activate && pip install uvicorn)

run:
	python -m app.main

check: