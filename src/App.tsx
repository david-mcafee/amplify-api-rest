import { useEffect, useState } from "react";
import "./App.css";
import { API } from "aws-amplify";
import {
  Button,
  Collection,
  Card,
  Heading,
  Flex,
  Text,
} from "@aws-amplify/ui-react";
import { v4 as uuidv4 } from "uuid";

const initialTodoState: Array<any> = [];

const App = () => {
  const [todos, setTodos] = useState(initialTodoState);

  useEffect(() => {
    fetchTodos();
  }, []);

  function getData() {
    const apiName = "todos";
    const path = "/todos";
    const myInit = {
      // OPTIONAL
      // headers: {}, // OPTIONAL
      headers: {
        // "Access-Control-Allow-Headers": "Content-Type",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        // "Content-Type": "application/json",
      },
      // response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    };

    return API.get(apiName, path, myInit);
  }

  async function fetchTodos() {
    const response = await getData();
    console.log("RESPONSE!", response);
    if (response.status === 200) {
      setTodos(response.data);
    }
    setTodos(response.data);
  }

  async function postData() {
    const id = uuidv4();
    const apiName = "todos";
    const path = `/todos`;
    const myInit = {
      // OPTIONAL
      body: {
        // id: id,
        text: `text ${Date.now()}`,
      }, // replace this with attributes you need
      headers: {},
    };

    return await API.post(apiName, path, myInit);
  }

  async function putData() {
    const apiName = "todos";
    const path = "/todos";
    const myInit = {
      // OPTIONAL
      body: {}, // replace this with attributes you need
      headers: {
        // "Access-Control-Allow-Headers": "Content-Type",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        // "Content-Type": "application/json",
      },
    };

    return await API.put(apiName, path, myInit);
  }

  async function putUpdateData() {
    const params = {
      body: {
        todoId: "12345",
        todoDesc: " update description",
      },
    };

    const apiResponse = await API.put("MyTableCRUD", "/manage-todos", params);
    console.log("apiResponse", apiResponse);
    if (apiResponse.status === 200) {
      console.log("Successfully updated todo", apiResponse);
    }
  }

  async function deleteData() {
    const apiName = "todos";
    const path = "/todos";
    const myInit = {
      // OPTIONAL
      headers: {
        // "Access-Control-Allow-Headers": "Content-Type",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "OPTIONS,PUT,POST,GET,DELETE",
        // "Content-Type": "application/json",
      },
    };
    return await API.del(apiName, path, myInit);
  }

  return (
    <Card width={"100%"} variation={"elevated"}>
      <Flex direction="column" alignItems="center">
        <Card width={"100%"} variation={"elevated"}>
          <Flex direction={"column"} alignItems="center">
            <Heading level={1}>My Todos</Heading>
            <Heading level={2}>Amplify REST API Demo</Heading>
          </Flex>
        </Card>
        <Card variation={"elevated"}>
          <button onClick={fetchTodos}>GET</button>
          <button onClick={postData}>POST</button>
          <button onClick={putData}>PUT</button>
          <button onClick={putUpdateData}>Update record with PUT</button>
          <button onClick={deleteData}>DELETE</button>
        </Card>
        <Collection type="list" items={todos} gap="1.5rem">
          {(todo, index) => (
            <Card
              key={todo.id ? todo?.id : index}
              padding="1.5rem"
              variation={"elevated"}
            >
              <Heading level={4}>{todo?.name}</Heading>
              <Text>{todo?.description}</Text>
              {/* <Button
                loadingText="loading"
                ariaLabel="Delete"
                onClick={() => removeTodo(todo)}
              >
                Delete
              </Button> */}
            </Card>
          )}
        </Collection>
      </Flex>
    </Card>
  );
};

export default App;
