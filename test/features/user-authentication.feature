Feature: User authentication

  Scenario: Submit login form hitting return key (GLA-28)
    Given admin user types in correct username and password
    When user hits a return key
    Then user should successfully log in

  Scenario: Invalid authentication email format (GLA-28)
    When a user enters an invalid authentication email
    Then he should see an authentication email validation error
