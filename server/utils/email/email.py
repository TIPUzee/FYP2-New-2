import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from ..env import Env
from .template import main_template


class EmailBaseClass:
    def __init__(self):
        self.smtp_server = 'smtp.gmail.com'
        self.smtp_port = 587
        self.smtp_username = Env.get('MAIL_USERNAME')
        self.smtp_password = Env.get('MAIL_PASSWORD')
        self.sender = 'AI-Disease Predictor'

    def send(self, html_content: str, recipients: list[str], subject: str):
        html_content = main_template.format(content=html_content, sender=self.sender, title=subject)

        email_body = MIMEText(html_content, 'html')

        email_message = MIMEMultipart()
        email_message['From'] = self.sender
        email_message['To'] = ', '.join(recipients)
        email_message['Subject'] = subject

        email_message.attach(email_body)

        with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
            server.starttls()
            server.login(self.smtp_username, self.smtp_password)
            server.send_message(email_message)
