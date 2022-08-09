const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert } = require("chai")

describe("FundMe", function () {
    let fundMe
    let mockV3Aggregator
    let deployer

    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        console.log("---------------------------------")
        console.log(deployer)
        console.log("---------------------------------")
        await deployments.fixture(["all"])

        fundMe = await ethers.getContractAt("FundMe", deployer)
        mockV3Aggregator = await ethers.getContractAt(
            "MockV3Aggregator",
            deployer
        )
    })

    describe("constructor", async function () {
        it("sets the aggregator addresses correctly", async function () {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })
})
