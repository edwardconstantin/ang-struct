Feature: User registration
  Scenario: Approved registered user logs in (GLA-608)
    When the approved RP user logs in
    Then the logged in welcome heading will display
    And the logged in welcome heading is "You are logged in to GLA Open Project System"
    And the logged in welcome message will display
    And the logged in welcome message is "This service is currently under development and will eventually become GLA's main system for managing grant projects"
    And the approved RP user name will be displayed in the header
    And the user will not see a message about pending approval

  Scenario: Approved registered user primary role display (GLA-890)
    When the approved RP user logs in
    Then the header will contain the text "GLA Partner"

  Scenario: Unapproved registered user logs in (GLA-610)
    When the unapproved RP user logs in
    Then the logged in welcome heading will display
    And the logged in welcome message will display
    And the unapproved RP user name will be displayed in the header
    And the page text will contain "Your registration has not yet been approved. You will receive an email confirming your registration in due course."
    And the page text will contain "Please contact GLA if you have any concerns or you have been informed that your registration has been approved."

  Scenario: Unapproved registered user primary role display (GLA-891)
    When the unapproved RP user logs in
    Then the header will contain the text "Unapproved User"

  Scenario: Invalid registration email format
    When a user enters an invalid registration email
    Then he should see a registration email validation error
