import boto3
import os

region = "ap-northeast-2"
ssm_client = boto3.client(
        'ssm',
        region_name=region,
        aws_access_key_id=os.environ.get("AWS_ACCESS", None),
        aws_secret_access_key=os.environ.get("AWS_SECRET", None),
)

ssm_key = ssm_client.get_parameter(Name='dev_jwt_secret')
JWT_SECRET = ssm_key['Parameter']['Value']
JWT_ALGORITHM = "HS256"
EXCEPT_PATH_LIST = ["/", "/openapi.json"]
EXCEPT_PATH_REGEX = "^(/docs|/redoc|/api/auth)"
MAX_API_KEY = 3
MAX_API_WHITELIST = 10
