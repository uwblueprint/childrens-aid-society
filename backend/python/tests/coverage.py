import os


def test_coverage_report():
    os.system("coverage run -m pytest")
    os.system("coverage report")


test_coverage_report()
