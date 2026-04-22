# tree-sitter-lc3

Made for the [Elk LC-3 toolchain](https://codeberg.org/dxrcy/elk).

## Neovim Usage

Using [`lazy`](https://lazy.folke.io/) and
[`nvim-tree-sitter`](https://github.com/nvim-treesitter/nvim-treesitter)
(`main` branch):

```lua
return {
    "nvim-treesitter/nvim-treesitter",
    branch = "main",
    build = ":TSUpdate",

    config = function()
        vim.api.nvim_create_autocmd("User", {
            pattern = "TSUpdate",
            callback = function()
                -- Custom parsers go here
                parsers.lc3 = {
                    install_info = {
                        -- nvim-treesitter only supports GitHub links :'(
                        url = "https://github.com/dxrcy/tree-sitter-lc3",
                        branch = "master",
                    },
                }
            end,
        })

        require("nvim-treesitter").install({
            -- List of parsers to install goes here
            -- "zig",
            "lc3",
        })

        vim.api.nvim_create_autocmd("FileType", {
            desc = "Enable treesitter in supported buffers",
            callback = function()
                pcall(vim.treesitter.start)
            end,
        })
    end

}
