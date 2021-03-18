import styled from "styled-components";
import { colors } from "../../design/colors";
import Departure from "./departure";
import { EnhancedDeparture } from "../../domains/timeTableToTheStation/types";

interface Props {
  enhancedDepartures?: EnhancedDeparture[];
  currentTrainCode: string;
  handleDepartureNav: (targetTrainCode: string) => () => void;
}

function TimeTable({
  enhancedDepartures,
  currentTrainCode,
  handleDepartureNav,
}: Props) {
  if (!currentTrainCode) {
    return <PanelEmpty></PanelEmpty>;
  }

  return (
    <Panel>
      <ScrollPanel>
        {enhancedDepartures &&
          enhancedDepartures.map((departure) => (
            <Departure
              key={departure.trainCode}
              selected={departure.trainCode === currentTrainCode}
              onSelect={handleDepartureNav(departure.trainCode)}
              {...departure}
            />
          ))}
      </ScrollPanel>
    </Panel>
  );
}

const Panel = styled.div`
  background: ${() => colors.dark.panel.one.background};
  color: ${() => colors.dark.panel.one.text.normal};
  margin-top: 0.3rem;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
`;

const PanelEmpty = styled(Panel)`
  background: ${() => colors.dark.background};
`;

const ScrollPanel = styled.div`
  flex-grow: 1;
  margin: 0.1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;

export { TimeTable as default };
