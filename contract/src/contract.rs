use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdError, StdResult,
};

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg, RaffleNumberResponse};
use crate::state::{config, config_read, State};

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, StdError> {
    let state = State {
        current_raffle_number: msg.current_raffle_number,
        random_binary: msg.random_binary,
        owner: info.sender.clone(),
    };

    config(deps.storage).save(&state)?;

    deps.api
        .debug(&format!("Contract was initialized by {}", info.sender));

    Ok(Response::default())
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::SpinRaffleWheel { max } => try_spin(deps, env, max),
    }
}

pub fn try_spin(deps: DepsMut, env: Env, max: u32) -> Result<Response, ContractError> {
    let random_binary = env.block.random.clone();
    let random_bytes = &random_binary.as_ref().unwrap().0;

    let random_number = u32::from_le_bytes([
        random_bytes[0],
        random_bytes[1],
        random_bytes[2],
        random_bytes[3],
    ]);

    config(deps.storage).update(|mut state| -> Result<_, ContractError> {
        let spin = (random_number % max) + 1;
        state.current_raffle_number = spin;
        state.random_binary = random_binary;

        Ok(state)
    })?;

    deps.api.debug("you spinned the secret raffle wheel!");
    Ok(Response::default())
}

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetRaffleNumber {} => to_binary(&query_raffle_number(deps)?),
    }
}

fn query_raffle_number(deps: Deps) -> StdResult<RaffleNumberResponse> {
    let state = config_read(deps.storage).load()?;
    Ok(RaffleNumberResponse {
        current_raffle_number: state.current_raffle_number,
        random_binary: state.random_binary,
    })
}
