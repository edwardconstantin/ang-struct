Feature: Framework

  Scenario: Page header has "OPEN PROJECT SYSTEM" title (GLA-804)
    Given any user
    When any page is accessed
    Then the header will contain the text "OPEN PROJECT SYSTEM"
      And the header will not contain the text "GLA OPS"
