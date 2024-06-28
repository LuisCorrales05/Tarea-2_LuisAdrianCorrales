class User:
    def __init__(self, user_id, name, email, message):
        self.user_id = user_id
        self.name = name
        self.email = email
        self.message = message

    def serialize(self):
        return {
            'user_id': self.user_id,
            'name': self.name,
            'email': self.email,
            'message': self.message
        }