Feature: Top menu
  Scenario: No menu on coming soon page (GLA-837)
    Given an unauthenticated user
    When "home" page is accessed
    Then there will be no menu shown.

  Scenario: No menu on logon page (GLA-837)
    When "logon" page is accessed
    Then there will be no menu shown.

  Scenario: No menu on registration page (GLA-837)
    When "registration" page is accessed
    Then there will be no menu shown.

  Scenario: Menu on organisations and coming soon message page (GLA-838)
    When the GLA admin user logs in
    When "admin/organisations" page is accessed
    Then a menu bar is displayed
    And the menu bar has a "Programmes" menu
    And the menu bar has a "Projects" menu
    And the menu bar has a "Admin" menu

  Scenario: Menu for non-admin user (GLA-839)
    Given the approved RP user logs in
    When "user" page is accessed
    Then a menu bar is displayed
    And the menu bar has a "Programmes" menu
    And the menu bar has a "Projects" menu
#    TODO uncomment when session is fixed
#    And the menu bar does not have a "Admin" menu

  Scenario: Programmes menu (GLA-842)
    Given the approved RP user logs in
    When the "Programmes" menu is clicked
    Then the page text will contain "This section of the service is currently in development and will be available in due course."

  Scenario: Programmes menu (GLA-842)
    Given the approved RP user logs in
    When the "Projects" menu is clicked
    Then the page text will contain "This section of the service is currently in development and will be available in due course."

  Scenario: Admin/Update content (GLA-843)
   Given the GLA admin user logs in
   When  the "Admin/Update content" menu is clicked
   Then the page text will contain "New 'Coming Soon' message"

  Scenario: Admin/Manage organisations (GLA-843)
    Given the GLA admin user logs in
    When  the "Admin/Manage organisations" menu is clicked
    Then the page text will contain "Registered Organisations"

  @browserSizeReset
  Scenario: Medium screen size shows hamburger menu with text (GLA-840)
    Given the GLA admin user logs in
    Given browser width is 767 pixels size
    Then the menu should be displayed as a hamburger icon
    And hamburger icon should be with the text "Menu"

  @browserSizeReset
  Scenario: Very small screen size shows hamburger menu without text (GLA-841)
    Given the GLA admin user logs in
    Given browser width is 414 pixels size
    Then the menu should be displayed as a hamburger icon
    And hamburger icon should be without the text "Menu"



