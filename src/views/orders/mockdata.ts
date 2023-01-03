import { TOrder } from "types/order";

export const data: TOrder[] = [
  {
    _id: "63b45b61e8dcabd675b2c323",
    status: "Completed",
    createdAt: "2023-01-03 12:39:58",
    completedAt: "2023-01-03 04:22:28",
  },
  {
    _id: "63b45b61444a3d151f42e9d0",
    status: "Completed",
    createdAt: "2023-01-02 06:12:27",
    completedAt: "2023-01-01 09:45:04",
  },
  {
    _id: "63b45b61ac21301726f5c914",
    status: "Completed",
    createdAt: "2023-01-03 10:15:34",
    completedAt: "2023-01-03 03:32:17",
  },
  {
    _id: "63b45b61e3d45d054ed7494f",
    status: "Pending",
    createdAt: "2023-01-03 09:23:18",
    completedAt: "2023-01-01 10:03:11",
  },
  {
    _id: "63b45b61e55180c5b5719427",
    status: "Completed",
    createdAt: "2023-01-01 04:04:18",
    completedAt: "2023-01-02 07:33:18",
  },
  {
    _id: "63b45b6129d21f666bcb05a0",
    status: "Pending",
    createdAt: "2023-01-01 12:53:53",
    completedAt: "2023-01-02 12:15:44",
  },
  {
    _id: "63b45b61aabf5c0a9cf74217",
    status: "Completed",
    createdAt: "2023-01-01 01:53:57",
    completedAt: "2023-01-02 01:44:15",
  },
  {
    _id: "63b45b61762128046d9a4cea",
    status: "Completed",
    createdAt: "2023-01-02 05:12:39",
    completedAt: "2023-01-02 07:36:39",
  },
  {
    _id: "63b45b61f6d90a1270db1f7f",
    status: "Pending",
    createdAt: "2023-01-03 09:12:09",
    completedAt: "2023-01-03 02:50:47",
  },
  {
    _id: "63b45b61999146e9745c5847",
    status: "Pending",
    createdAt: "2023-01-03 01:35:03",
    completedAt: "2023-01-02 02:38:32",
  },
  {
    _id: "63b45b61b2acbd50fff4e8f6",
    status: "Completed",
    createdAt: "2023-01-01 04:03:38",
    completedAt: "2023-01-01 04:57:25",
  },
  {
    _id: "63b45b618107e8c14619ec27",
    status: "Completed",
    createdAt: "2023-01-02 11:04:39",
    completedAt: "2023-01-01 05:39:12",
  },
  {
    _id: "63b45b612239a2f55dca537f",
    status: "Pending",
    createdAt: "2023-01-03 12:27:52",
    completedAt: "2023-01-01 03:50:31",
  },
  {
    _id: "63b45b6139aa5c7a253e0b6b",
    status: "Completed",
    createdAt: "2023-01-02 08:20:47",
    completedAt: "2023-01-01 02:47:38",
  },
  {
    _id: "63b45b61e098dd313daf1d62",
    status: "Completed",
    createdAt: "2023-01-02 02:24:12",
    completedAt: "2023-01-01 09:15:00",
  },
  {
    _id: "63b45b6195cb79596ac7176c",
    status: "Pending",
    createdAt: "2023-01-02 04:02:24",
    completedAt: "2023-01-02 05:21:22",
  },
  {
    _id: "63b45b61f5ab4ec528279c0f",
    status: "Completed",
    createdAt: "2023-01-02 07:27:32",
    completedAt: "2023-01-02 11:37:22",
  },
  {
    _id: "63b45b615dd3e1007b793fbb",
    status: "Completed",
    createdAt: "2023-01-03 08:13:55",
    completedAt: "2023-01-02 10:40:52",
  },
  {
    _id: "63b45b613ae10f4d544b9fa9",
    status: "Pending",
    createdAt: "2023-01-01 12:11:32",
    completedAt: "2023-01-01 11:05:08",
  },
  {
    _id: "63b45b619c539c910dc3e342",
    status: "Pending",
    createdAt: "2023-01-01 05:51:37",
    completedAt: "2023-01-03 02:57:20",
  },
];

// [
//   '{{repeat(20, 20)}}',
//   {
//     _id: '{{objectId()}}',
//     status: '{{random("Pending", "Completed" )}}',
//     createdAt: '{{date(new Date(2022, 12, 1), new Date(), "YYYY-MM-dd hh:mm:ss")}}',
//     completedAt: '{{date(new Date(2022, 12, 1), new Date(), "YYYY-MM-dd hh:mm:ss")}}'
//   }
// ]
