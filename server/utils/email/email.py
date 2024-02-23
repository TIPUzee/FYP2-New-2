import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from ..env import Env
from .template import main_template


class EmailBaseClass:
    def __init__(self):
        super().__init__()

    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    smtp_username = Env.get('MAIL_USERNAME')
    smtp_password = Env.get('MAIL_PASSWORD')
    sender = 'AI-Disease Predictor'

    @staticmethod
    def send(html_content: str, recipients: list[str], subject: str):
        html_content = main_template.format(content=html_content, sender=EmailBaseClass.sender, title=subject)

        email_body = MIMEText(html_content, 'html')

        email_message = MIMEMultipart()
        email_message['From'] = EmailBaseClass.sender
        email_message['To'] = ', '.join(recipients)
        email_message['Subject'] = subject

        email_message.attach(email_body)

        with smtplib.SMTP(EmailBaseClass.smtp_server, EmailBaseClass.smtp_port) as server:
            server.starttls()
            server.login(EmailBaseClass.smtp_username, EmailBaseClass.smtp_password)
            server.send_message(email_message)
