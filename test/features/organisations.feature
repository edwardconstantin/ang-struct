Feature: Organisations

  Scenario: Titles for organisations table are correct (GLA-851)
    Given the GLA admin user logs in
    When the organisations list is displayed
    Then there will be no "Email" column
    And there will be no "CEO title" column
    And the first column will have the title "ID NO."

  Scenario: More than 50 organisations (GLA-621)
    When the GLA admin user logs in
    And there are more than 50 organisations
    And the organisations list is displayed
    Then I will see how many organisations in total are available
    And each page will display 50 organisations
    And I will see how many pages are available to click through
    And I will be able to paginate forwards through the pages until I am at the last page of organisations
    And I will be able to paginate backwards through the pages until I am back to the first page of 50 organisations

  Scenario: Sort alphabetically and secondary column sorting (GLA-639)
    Given the GLA admin user logs in
    When the organisations list is displayed
    Then the table is sorted alphabetically by column "ORG. NAME" ascending
    When I click on the column "ORG. NAME" header
    Then the table is sorted alphabetically by column "ORG. NAME" descending
    When I click on the column "REGULATED?" header
    Then the table is sorted alphabetically by column "REGULATED?" ascending
    When the "REGULATED?" column values are of equal value
    Then the table is sorted alphabetically by column "ORG. NAME" ascending

  Scenario: Sort numerically (GLA-902)
    Given the GLA admin user logs in
    And the organisations list is displayed
    When I click on the column "ID NO." header
    Then the table is sorted numerically by column "ID NO." ascending
    When I click on the column "ID NO." header
    And the table is sorted numerically by column "ID NO." descending

  @unapproveUser
  Scenario: Approve registration (GLA-605)
    Given the GLA admin user logs in
    And he navigates to the "Test Registered Provider" organisation details page
    When he clicks on the "Approve" button for user "unapprovedgla@gmail.com"
    Then the button will not display and will be replaced by the word "Approved" for user "unapprovedgla@gmail.com"
