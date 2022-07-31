class GoalDTO:
    def __init__(self, id, goal, type):
        self.id = id
        self.goal = goal.upper()


class CreateGoalDTO:
    def __init__(self, goal, type):
        error = self.validate(goal)
        if error:
            raise Exception(error)
        self.goal = goal.upper()

    def validate(self, goal):
        error_list = []
        if not goal or type(goal) is not str:
            error_list.append("The goal supplied is not a string.")
        return error_list
