# The broker URL tells Celery where Redis is running.
broker_url = 'redis://redis:6379/0'

# The result backend URL tells Celery where to store the results of tasks.
result_backend = 'redis://redis:6379/0'