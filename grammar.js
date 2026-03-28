/**
* @file Lc3 grammar for tree-sitter
* @author darcy
* @license MIT
*/

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
    name: "lc3",

    extras: _ => ["\r", " "],

    rules: {
        document: $ => repeat(seq(
            optional($.line),
            optional($.comment),
            choice("\n", "\0"),
        )),

        comment: $ => /;[^\n]*/,

        line: $ => choice(
            $.label_definition,
            seq(
                optional($.label_definition),
                choice(
                    $.trap_alias,
                    $.instruction,
                    $.directive,
                ),
            ),
        ),

        label_definition: $ => seq(
            $.label,
            optional($.colon),
        ),

        instruction: $ => seq(
            $.mnemonic,
            optional(seq(
                $.operand,
                repeat(seq(
                    optional($.comma),
                    $.operand,
                )),
            )),
        ),

        operand: $ => choice(
            $.register,
            $.integer,
            $.label,
        ),

        directive: $ => seq(
            $.period,
            $.directive_name,
            repeat(choice(
                $.integer,
                $.string,
            )),
        ),

        mnemonic: $ => choice(
            "add", "and", "not", "jmp", "ret", "jsr", "jsrr",
            "lea", "ld", "st", "ldi", "sti", "ldr", "str",
            "br", "brn", "brz", "brp", "brnz", "brzp", "brnp", "brnzp",
            "trap", "push", "pop", "call", "rets", "rti",
        ),

        label: $ => /[A-Z_][a-z0-9_]*/,
        trap_alias: $ => /[a-z_][a-z0-9_]*/,
        directive_name: $ => /[A-Z_]+/,

        register: $ => /r[0-7]/,

        integer: $ => choice(
            // TODO: Make better
            /[-+]?0?x[-+]?[0-9a-zA-Z_]+/,
            /#?[-+]?[0-9_]+/,
        ),

        string: $ => /".*"/,

        period: $ => ".",
        comma: $ => ",",
        colon: $ => ":",
    },
});
