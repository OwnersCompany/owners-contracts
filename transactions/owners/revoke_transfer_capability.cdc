

transaction() {

    prepare(admin: AuthAccount) {
        let transferPrivatePath = /private/OwnersTransferV1
        admin.unlink(transferPrivatePath)
    }
}