import axios from "axios";

import { GET_PARTYS } from "./Types";

// export const getPartys = () => (dispatch: any) => {
//   axios
//     .get("/partys")
//     .then((res) => {
//       dispatch({
//         type: GET_PARTYS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => console.log(err));
// };

type party = {
  id: number;
  name: string;
  anon_gold: number;
  master: number; //Foreign key links to user
};

type GetPartysResponse = {
  data: party[];
};

type CreatePartyResponse = {
  name: string;
  anon_gold: string;
  master: number;
};

type DeletePartyResponse = "";

//Get User's partys
export async function getPartys() {
  try {
    // 👇️ const data: GetUsersResponse
    const { data, status } = await axios.get<GetPartysResponse>(
      "http://localhost:8000/partys",
      {
        headers: {
          Accept: "application/json",
          Authorization:
            "Token beccb5c352f266cdcb9435820a3de135210bae35fa4cd11828fd6dd0a61b7c51",
        },
      }
    );

    console.log(JSON.stringify(data, null, 4));

    // 👇️ "response status is: 200"
    console.log("response status is: ", status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

//Create a new party
export async function createParty(
  name: string,
  anon_gold: number,
  master: number
) {
  try {
    // 👇️ const data: CreateUserResponse
    const { data } = await axios.post<CreatePartyResponse>(
      "http://localhost:8000/partys",
      { name: name, anon_gold: anon_gold, master: master },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log(JSON.stringify(data, null, 4));

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      // 👇️ error: AxiosError<any, any>
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

async function deleteUser(partyId: number) {
  try {
    // 👇️ const data: UpdateUserResponse
    const { data, status } = await axios.delete<DeletePartyResponse>(
      `http://localhost:8000/partys/${partyId}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    console.log("response is: ", data);

    // 👇️ response status is: 204
    console.log("response status is: ", status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      // 👇️ error: AxiosError<any, any>
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
