from rest_framework.throttling import UserRateThrottle, AnonRateThrottle


class BurstRateThrottle(UserRateThrottle):
    scope = '60/min'


class SustainedRateThrottle(UserRateThrottle):
    scope = '1000/day'
