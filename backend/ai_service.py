# def generate_health_remark(
#     glucose,
#     haemoglobin,
#     cholesterol
# ):

#     risk = []

#     if glucose > 110:
#         risk.append(
#             "High glucose detected."
#         )

#     if cholesterol > 200:
#         risk.append(
#             "High cholesterol detected."
#         )

#     if haemoglobin < 12:
#         risk.append(
#             "Low haemoglobin detected."
#         )

#     if len(risk) == 0:
#         return "Patient appears healthy."

#     return " ".join(risk)

import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def generate_health_remark(
    glucose,
    haemoglobin,
    cholesterol
):

    prompt = f"""
You are a healthcare AI assistant.

Analyze the following blood report:

Glucose: {glucose} mg/dL
Haemoglobin: {haemoglobin} g/dL
Cholesterol: {cholesterol} mg/dL

Return EXACT format:

Risk Level: (Healthy / At Risk / Critical)
Possible Condition:
Explanation:
Recommendation:

Keep response under 80 words.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
        max_tokens=150
    )

    return response.choices[0].message.content

def extract_status(ai_text: str):
    for line in ai_text.split("\n"):
        if "Risk Level" in line:
            return line.split(":")[1].strip()
    return "Unknown"