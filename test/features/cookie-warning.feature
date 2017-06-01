Feature: Cookie warning
  Scenario: Cookie warning is shown (GLA-635)
    Given there are no cookies logged against the browser on the device
    When any page is accessed
    Then a modal will display informing the user about the GLA cookie policy
    Then The modal will display in a fixed position on the screen

  Scenario: Cookie warning is hidden (GLA-636)
    Given there is a cookie modal displaying on the page
    When the user selects to dismiss the modal
    Then the modal will not display
    And the user will not see the modal again on that browser on the device unless localStorage is cleared

  Scenario: Cookie warning policy link opens in new tab (GLA-653)
    Given I have a cookie policy modal on the page I am viewing
    When I click or tap the privacy policy link in the modal
    Then the GLA privacy policy page will display in a new tab
