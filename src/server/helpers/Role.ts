enum Role {
    host,
    opponent,
    spectator
};

type Roles = {[username: string]: Role};

function getInitialRoles(): Roles {
    return {};
}

const roles = getInitialRoles();

export default Role;
export { getInitialRoles, roles };
export type { Roles };
