# Redux actions

- timeTable
  - groupe those data into 'for'
    - "at": "2020-03-10T09:22:30+01:00",
      "provider": "ratp",
      "type": "rers",
      "line": "a",
      "station": "chatelet+les+halles",
      "missions": ["ZEBU"]
    - rename routes into 'departures'
    - transform station into
      - slug
      - name

timeTable.departures

- toTheStation
  - remove station => redirect to timeTable
  - train => selectedTrain
  - stationConfiguration =>
    - stationConfigurations
      - {
        - stationSlug
        - travelDurationSeconds
        - waitingDelaySeconds
      - }