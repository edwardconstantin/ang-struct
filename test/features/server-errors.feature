Feature: Server errors

  Scenario: Internal server error modal (GLA-727)
    Given any page is accessed
    When "getError" API is called
    Then error modal will be shown

