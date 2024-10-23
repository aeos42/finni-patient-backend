import json
import random
from datetime import datetime, timedelta

def generate_random_date(start_date, end_date):
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    return start_date + timedelta(days=random_number_of_days)

def generate_patient():
    first_names = ["John", "Jane", "Michael", "Emily", "David", "Sarah", "Robert", "Lisa", "William", "Mary"]
    last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"]
    streets = ["Main St", "Oak Ave", "Maple Rd", "Cedar Ln", "Pine St", "Elm St", "Washington Ave", "Park Rd", "Lake Dr", "River Rd"]
    cities = ["Springfield", "Rivertown", "Lakeside", "Hillview", "Meadowbrook", "Forestville", "Sunnydale", "Oakville", "Brookside", "Greenfield"]
    states = ["CA", "NY", "TX", "FL", "IL", "PA", "OH", "GA", "NC", "MI"]

    extra_field_options = {
        "phoneNumber": lambda: f"{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}",
        "emergencyContact": lambda: f"{random.choice(first_names)} {random.choice(last_names)}",
        "bloodType": lambda: random.choice(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
        "height": lambda: f"{random.randint(150, 200)} cm",
        "weight": lambda: f"{random.randint(45, 120)} kg",
        "occupation": lambda: random.choice(["Teacher", "Engineer", "Doctor", "Artist", "Lawyer", "Chef", "Accountant", "Nurse", "Salesperson", "Manager"]),
        "allergies": lambda: random.choice(["None", "Peanuts", "Penicillin", "Latex", "Shellfish", "Pollen", "Dust"]),
        "preferredLanguage": lambda: random.choice(["English", "Spanish", "French", "German", "Chinese", "Arabic"]),
        "insuranceProvider": lambda: random.choice(["BlueCross", "Aetna", "UnitedHealth", "Cigna", "Humana"]),
        "lastCheckup": lambda: generate_random_date(datetime(2020, 1, 1), datetime(2023, 12, 31)).strftime("%Y-%m-%d")
    }

    patient = {
        "firstName": random.choice(first_names),
        "lastName": random.choice(last_names),
        "address": f"{random.randint(100, 999)} {random.choice(streets)}, {random.choice(cities)}, {random.choice(states)}",
        "dateOfBirth": generate_random_date(datetime(1940, 1, 1), datetime(2005, 12, 31)).isoformat(),
        "status": random.choice(["Active", "Onboarding", "Churned", "Inquiry"]),
        "extraFields": {}
    }

    num_extra_fields = random.randint(1, 10)
    extra_fields = random.sample(list(extra_field_options.items()), num_extra_fields)
    for field, value_func in extra_fields:
        patient["extraFields"][field] = value_func()

    return patient

patients = [generate_patient() for _ in range(250)]

with open('patients.json', 'w') as f:
    json.dump(patients, f, indent=2)

print(f"patients.json file has been generated with {len(patients)} random patients.")
