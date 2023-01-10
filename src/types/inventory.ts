type TInventory = {
  _id: string;
};

type TInventoryItem = {
  id: number;
  name: string;
  quantity: number;
};

type TInventoryItemCreateRequest = {
  name: string;
  quantity: number;
};

export type { TInventory, TInventoryItemCreateRequest, TInventoryItem };
