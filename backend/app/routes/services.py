import json
import os
from fastapi import APIRouter

from app.models import MessageOk

import boto3
from botocore.exceptions import ClientError

router = APIRouter(prefix='/services')

@router.post("email/send_by_ses")
async def email_by_ses():
    sender = "ironkey@nolmungshimung.com"
    recipient = ["kimchelgi03@gmail.com"]

    # If necessary, replace us-west-2 with the AWS Region you're using for Amazon SES.
    region = "ap-northeast-2"

    # The subject line for the email.
    title = "Writinghub 테스트 이메일 입니다."

    # The email body for recipients with non-HTML email clients.
    BODY_TEXT = ("안녕하세요! WritingHub 입니다.\r\n"
                 "만나서 반갑습니다!"
                 )

    # The HTML body of the email.
    BODY_HTML = """<html>
    <head></head>
    <body>
      <h1>안녕하세요! WritingHub 입니다.</h1>
      <p> 만나서 반갑습니다.
        <a href='https://ironkey.space'>Ironkey</a>
      </p>
    </body>
    </html>
                """

    # The character encoding for the email.
    charset = "UTF-8"

    # Create a new SES resource and specify a region.
    client = boto3.client(
        'ses',
        region_name=region,
        aws_access_key_id=os.environ.get("AWS_ACCESS", None),
        aws_secret_access_key=os.environ.get("AWS_SECRET", None),
    )

    # Try to send the email.
    try:
        # Provide the contents of the email.
        response = client.send_email(
            Destination={
                'ToAddresses': recipient
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': charset,
                        'Data': BODY_HTML,
                    },
                    'Text': {
                        'Charset': charset,
                        'Data': BODY_TEXT,
                    },
                },
                'Subject': {
                    'Charset': charset,
                    'Data': title,
                },
            },
            Source=sender,
        )
    # Display an error if something goes wrong.
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("Email sent! Message ID:"),
        print(response['MessageId'])

    return MessageOk()
