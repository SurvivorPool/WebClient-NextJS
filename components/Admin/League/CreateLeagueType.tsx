import { Box, Button, Flex, TextInput, Title } from "@mantine/core";
import { useMemo, useState } from "react";

import { notifications } from "@mantine/notifications";
import useAdminLeague from "@/hooks/useAdminLeague";

const CreateLeagueType = () => {
  const { createLeagueType } = useAdminLeague();
  const { mutate, isLoading } = createLeagueType;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({
    name: "",
    description: "",
  });

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      ...error,
      name: "",
    });
    setName(event.currentTarget.value);
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      ...error,
      description: "",
    });
    setDescription(event.currentTarget.value);
  };

  const onLeagueNameConfirm = async () => {
    if (!name) {
      setError({
        ...error,
        name: "League name is required",
      });
    }

    if (!description) {
      setError({
        ...error,
        description: "League description is required",
      });
    }

    await mutate(
      {
        name,
        description,
      },
      {
        onSuccess: () => {
          notifications.show({
            title: "League Type Created",
            message: `${name} has been created successfully.`,
            color: "green",
          });
          setName("");
          setDescription("");
        },
      }
    );
  };

  const isCreateButtonDisabled = useMemo(() => {
    return !!error.name || !!error.description;
  }, [error]);

  return (
    <Flex
      direction={"column"}
      gap={"16px"}
      sx={{
        paddingRight: "8px",
      }}
    >
      <Title order={6}>League Type Creation</Title>
      <TextInput
        value={name}
        label="League Type Name"
        onChange={onNameChange}
        error={error.name}
        placeholder="Enter type name..."
        required
      />
      <TextInput
        value={description}
        label="League Type Description"
        onChange={onDescriptionChange}
        error={error.description}
        placeholder="Enter type description..."
        required
      />
      <Box>
        <Button
          loading={isLoading}
          disabled={isCreateButtonDisabled}
          onClick={onLeagueNameConfirm}
        >
          Create League Type
        </Button>
      </Box>
    </Flex>
  );
};

export default CreateLeagueType;
