use ink_lang as ink;

#[ink::contract]
mod token {
    #[ink(storage)]
    pub struct Token {
        total_supply: Balance,
        balances: ink::collections::HashMap<AccountId, Balance>,
        allowances: ink::collections::HashMap<(AccountId, AccountId), Balance>,
    }

    #[ink(event)]
    pub struct Transfer {
        from: Option<AccountId>,
        to: Option<AccountId>,
        value: Balance,
    }

    #[ink(event)]
    pub struct Approval {
        owner: AccountId,
        spender: AccountId,
        value: Balance,
    }

    impl Token {
        #[ink(constructor)]
        pub fn new(initial_supply: Balance) -> Self {
            let mut balances = ink::collections::HashMap::new();
            let caller = Self::env().caller();
            balances.insert(caller, initial_supply);
            Self {
                total_supply: initial_supply,
                balances,
                allowances: ink::collections::HashMap::new(),
            }
        }

        #[ink(message)]
        pub fn total_supply(&self) -> Balance {
            self.total_supply
        }

        #[ink(message)]
        pub fn balance_of(&self, owner: AccountId) -> Balance {
            self.balances.get(&owner).copied().unwrap_or(0)
        }

        #[ink(message)]
        pub fn transfer(&mut self, to: AccountId, value: Balance) -> bool {
            let caller = self.env().caller();
            let caller_balance = self.balances.get(&caller).copied().unwrap_or(0);

            if caller_balance < value || value == 0 {
                return false;
            }

            self.balances.insert(caller, caller_balance - value);
            let to_balance = self.balances.get(&to).copied().unwrap_or(0);
            self.balances.insert(to, to_balance + value);

            self.env().emit_event(Transfer {
                from: Some(caller),
                to: Some(to),
                value,
            });

            true
        }

        #[ink(message)]
        pub fn approve(&mut self, spender: AccountId, value: Balance) -> bool {
            let owner = self.env().caller();
            self.allowances.insert((owner, spender), value);

            self.env().emit_event(Approval {
                owner,
                spender,
                value,
            });

            true
        }

        #[ink(message)]
        pub fn transfer_from(
            &mut self,
            from: AccountId,
            to: AccountId,
            value: Balance,
        ) -> bool {
            let caller = self.env().caller();
            let allowance = self.allowances.get(&(from, caller)).copied().unwrap_or(0);
            let from_balance = self.balances.get(&from).copied().unwrap_or(0);

            if from_balance < value || allowance < value || value == 0 {
                return false;
            }

            self.balances.insert(from, from_balance - value);
            let to_balance = self.balances.get(&to).copied().unwrap_or(0);
            self.balances.insert(to, to_balance + value);

            self.allowances.insert((from, caller), allowance - value);

            self.env().emit_event(Transfer {
                from: Some(from),
                to: Some(to),
                value,
            });

            true
        }
    }
}
