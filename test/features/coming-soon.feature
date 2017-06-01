Feature: GLA Application

  Scenario: Visit comming-soon page (GLA-30)
    Given an unauthenticated user
    When "home" page is accessed
    Then page title will be "GLA OPS"
      And the page text will contain "Housing and Land Open Project System"
      And page will contain an image with alternate text "City Hall image - testing image text"

