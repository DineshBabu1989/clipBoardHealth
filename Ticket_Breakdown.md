# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Available tables : Facilities, Agents, and Shifts

Report generation task :
step:1
getShiftsByFacility(id) ---> [
{
shift: "001"
agentId: "13133"
},
...
{
shift: "002"
agentId: "13133"
}
]
step:2
generateReport([001, 002]) --- > PDF([shifts, agentid])

Task:1 Ability to store custom id for agents

Deliverables:

- an api endpoint to create a custom id in the agents table, by corresponding facility

Description:
Every feacility should be allowed to create a custom id field to its agents

DoD(acceptance criteria):

- Migrate agents table to support a custom id field
- Provide proper up and down migration and write proper integration tests
- Create an endpoint that does a PATCH request to the agents table to modify custom id field
- Verify if the user (facility) has proper authorisation over agents table
- Handle all validation cases for validating user inputs and santise all inputs to mitigate security
  risks
- Use proper status codes to handle success and errors
- Write integration tests for verifying the entire work flow.

Estimation: 3 days
Effort: medium

---

Task:2 Generate PDF with new user id

Deliverables: The PDF should include custom id for agents

Description:
Modify getShiftsByFacility function to use custom id for agents when they exist

DoD(acceptance criteria):

- Modify getShiftsByFacility to get custom id for agents if the exist
- Use agent db id as a fallback when custom id doesn't exist or null
- Write proper unit tests and integration tests to verify use case
- Use proper status codes to handle success and errors

Estimation: 1 day
Effort: easy
