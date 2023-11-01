import {
  Accordion,
  Box,
  List,
  Modal,
  Text,
  Textarea,
  ThemeIcon,
} from "@mantine/core";
import { IWeeklyUpdate } from "../interfaces/weekly-update.interface";
import { greenHexCode } from "../constants";
import { ScrollArea } from "@mantine/core";
import { IconAlertCircleFilled, IconCircleCheck } from "@tabler/icons-react";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IKudos } from "../interfaces/kudos.interface";

export const KudosAndUpdates: React.FC<{
  weeklyUpdate: IWeeklyUpdate;
  type: "positive" | "alert"
}> = ({ weeklyUpdate, type }) => {
  const kudos = weeklyUpdate.kudos;

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedKudos, setSelectedKudos] = useState<IKudos>();

  return (
    <>
      <Modal opened={opened} onClose={close} title={<h2 style={{marginTop: '20px'}}>{selectedKudos?.kudosTitle}</h2>} size="70%" >
        <div style={{minHeight: '50vh'}}>
        <Textarea styles={{input: {border: 'none'}}} size="xl" autosize value={selectedKudos?.kudosText}></Textarea>
        </div>
      </Modal>
      <Box h={"100%"} w={"100%"}>
        {/* <h2 style={{ marginTop: 0 }}>Kudos and Success Stories</h2>{" "} */}
        <List
          spacing="md"
          size="lg"
          center
          icon={
            <ThemeIcon color={type === 'positive' ? 'teal' : 'red' } size={24} radius="xl">
              {type === 'positive' ? <IconCircleCheck size="1rem" /> : <IconAlertCircleFilled size="1rem" />}
            </ThemeIcon>
          }
        >
          {kudos.map((kudos, index) => {
            return (
              <List.Item
                key={index}
                onClick={() => {
                  setSelectedKudos(kudos);
                  open();
                }}
                style={{cursor: "pointer"}}
              >
                <u>{kudos.kudosTitle}</u>
              </List.Item>
            );
          })}
        </List>
      </Box>
    </>
  );
};
