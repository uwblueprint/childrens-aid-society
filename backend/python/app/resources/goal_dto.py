class GoalDTO:
    def __init__(self, id, goal, type):
        self.id = id
        self.goal = goal
        self.type = type


class CreateGoalDTO:
    def __init__(self, goal, type):
        error = self.validate(goal, type)
        if error:
            raise Exception(error)
        self.goal = goal
        self.type = type

    def validate(self, goal, goal_type):
        error_list = []
        if not goal or type(goal) is not str:
            error_list.append("The goal supplied is not a string.")
        if not goal_type or type(goal_type) is not str:
            error_list.append("The type supplied is not a string.")
        if goal_type is not "LONG_TERM" or goal_type is not "SHORT_TERM":
            error_list.append(
                "The type of goal must be one of 'SHORT_TERM' or 'LONG_TERM'."
            )
        return error_list
