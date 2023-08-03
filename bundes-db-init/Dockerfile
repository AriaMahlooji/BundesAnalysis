FROM python:3

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app.py .
COPY import_images_utilities.py .
COPY import_images_service.py .
COPY import_relational_data_utilities.py .
COPY import_relational_data_service.py .

#COPY ./relational-data/variables/teams.pkl app/relational-data/variables/teams.pkl




#CMD ["python", "app.py"]
